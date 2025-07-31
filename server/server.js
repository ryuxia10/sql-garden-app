import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import alasql from 'alasql'; // Impor library baru kita

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

// --- Koneksi ke Database Master (TiDB Cloud) ---
// Ini hanya digunakan untuk mengambil data asli
const masterPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

// --- Manajemen Sesi & Sandbox ---
// Objek ini akan menyimpan "akuarium" data untuk setiap pengguna
const userSessions = {};

app.post('/api/query', async (req, res) => {
  const { query, sessionId } = req.body;

  if (!query || !sessionId) {
    return res.status(400).json({ error: 'Query atau Session ID tidak boleh kosong.' });
  }

  try {
    // Cek apakah pengguna ini sudah punya "akuarium"
    if (!userSessions[sessionId]) {
      console.log(`Menciptakan sandbox baru untuk sesi: ${sessionId}`);

      // Jika belum, buatkan satu. Ambil data asli dari TiDB Cloud.
      const [mawarData] = await masterPool.query('SELECT * FROM mawar');
      const [daerahData] = await masterPool.query('SELECT * FROM info_daerah');

      // Buat database baru di memori server
      const sandboxDb = new alasql.Database();

      // Masukkan data asli ke dalam "akuarium"
      sandboxDb.exec('CREATE TABLE mawar (id INT PRIMARY KEY, warna VARCHAR(50), tinggi_cm INT, asal_bibit VARCHAR(50));');
      sandboxDb.tables.mawar.data = mawarData;

      sandboxDb.exec('CREATE TABLE info_daerah (nama_daerah VARCHAR(50) PRIMARY KEY, tingkat_kesuburan VARCHAR(20), ketinggian_mdpl INT);');
      sandboxDb.tables.info_daerah.data = daerahData;

      // Simpan "akuarium" ini untuk sesi pengguna
      userSessions[sessionId] = sandboxDb;
    }

    // Jalankan query pengguna pada "akuarium" pribadinya, bukan di database master
    const results = userSessions[sessionId].exec(query);

    // Kirim hasilnya kembali
    // Hasil dari alasql sedikit berbeda, jadi kita sesuaikan
    const responseData = results.length > 0 && results[0].affectedRows !== undefined 
      ? { affectedRows: results[0].affectedRows } 
      : results;

    res.status(200).json({ data: responseData });

  } catch (error) {
    // Jika query pengguna salah (syntax error, dll)
    console.error('Alasql Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});