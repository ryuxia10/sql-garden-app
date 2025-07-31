import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import alasql from 'alasql';

const app = express();

app.use(cors());
app.use(express.json());

// --- Variabel untuk menyimpan status koneksi ---
let masterPool;
let connectionError = null;

// --- Blok try...catch untuk koneksi database ---
// Kita coba buat koneksi saat server pertama kali dijalankan.
try {
  masterPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionLimit: 1, // Batasi koneksi untuk efisiensi di lingkungan serverless
  });
  console.log("Koneksi ke database master berhasil dibuat.");
} catch (error) {
  console.error("GAGAL MEMBUAT KONEKSI DATABASE:", error);
  connectionError = error;
}

const userSessions = {};

app.post('/api', async (req, res) => {
  // Cek apakah koneksi database gagal dari awal
  if (connectionError) {
    return res.status(500).json({ error: `Koneksi database gagal: ${connectionError.message}` });
  }

  const { query, sessionId } = req.body;

  if (!query || !sessionId) {
    return res.status(400).json({ error: 'Query atau Session ID tidak boleh kosong.' });
  }

  try {
    if (!userSessions[sessionId]) {
      console.log(`Menciptakan sandbox baru untuk sesi: ${sessionId}`);
      const [mawarData] = await masterPool.query('SELECT * FROM mawar');
      const [daerahData] = await masterPool.query('SELECT * FROM info_daerah');
      
      const sandboxDb = new alasql.Database();
      sandboxDb.exec('CREATE TABLE mawar (id INT PRIMARY KEY, warna VARCHAR(50), tinggi_cm INT, asal_bibit VARCHAR(50));');
      sandboxDb.exec('INSERT INTO mawar SELECT * FROM ?', [mawarData]);
      sandboxDb.exec('CREATE TABLE info_daerah (nama_daerah VARCHAR(50) PRIMARY KEY, tingkat_kesuburan VARCHAR(20), ketinggian_mdpl INT);');
      sandboxDb.exec('INSERT INTO info_daerah SELECT * FROM ?', [daerahData]);
      userSessions[sessionId] = sandboxDb;
    }

    const results = userSessions[sessionId].exec(query);
    const responseData = results.length > 0 && results[0].affectedRows !== undefined 
      ? { affectedRows: results[0].affectedRows } 
      : results;
    
    res.status(200).json({ data: responseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;