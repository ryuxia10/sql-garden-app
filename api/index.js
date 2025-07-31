import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import alasql from 'alasql';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

let masterPool;
try {
  masterPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'test',
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionLimit: 1,
  });
} catch (error) {
  console.error("GAGAL MEMBUAT KONEKSI DATABASE:", error);
}

const userSessions = {};

app.post('/api', async (req, res) => {
  if (!masterPool) {
    return res.status(500).json({ error: "Koneksi database master tidak terinisialisasi." });
  }

  const { query, sessionId } = req.body;
  if (!query || !sessionId) {
    return res.status(400).json({ error: 'Query atau Session ID tidak boleh kosong.' });
  }

  try {
    if (!userSessions[sessionId]) {
      console.log(`(Server) Menciptakan sandbox baru untuk sesi: ${sessionId}`);
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
    console.error("Server runtime error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default app;