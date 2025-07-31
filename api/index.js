import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));

let masterPool;
try {
  masterPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionLimit: 1,
  });
} catch (error) {
  console.error("GAGAL MEMBUAT KONEKSI DATABASE:", error);
}

// Endpoint baru yang hanya untuk mengambil data awal
app.get('/api/get-initial-data', async (req, res) => {
  if (!masterPool) {
    return res.status(500).json({ error: "Koneksi database master tidak terinisialisasi." });
  }
  try {
    const [mawarData] = await masterPool.query('SELECT * FROM mawar');
    const [daerahData] = await masterPool.query('SELECT * FROM info_daerah');
    res.status(200).json({ mawar: mawarData, info_daerah: daerahData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;