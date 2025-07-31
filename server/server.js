// 1. Impor semua bahan yang kita butuhkan
import express from 'express';
import mysql from 'mysql2/promise'; // Gunakan versi promise untuk kode yang lebih bersih
import cors from 'cors';

// 2. Inisialisasi aplikasi Express
const app = express();
const PORT = 3001; // Kita gunakan port 3001 untuk server backend

// 3. Terapkan middleware
app.use(cors()); // Izinkan permintaan dari domain lain (React app kita)
app.use(express.json()); // Izinkan server membaca data JSON dari permintaan

// 4. Buat koneksi ke database MySQL Anda di XAMPP
//    'promisePool' memungkinkan kita menggunakan async/await
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Tambahkan port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
});

// 5. Buat sebuah "rute" atau "endpoint" untuk pengujian
//    Ini adalah alamat yang akan dihubungi oleh React
app.get('/api/test', async (req, res) => {
  try {
    // Coba lakukan query sederhana ke database
    const [rows] = await pool.query('SELECT "Koneksi ke MySQL Berhasil!" as message');
    // Kirim hasilnya kembali sebagai JSON
    res.json(rows[0]);
  } catch (error) {
    // Jika ada eror, kirim pesan eror
    console.error('Database query error:', error);
    res.status(500).json({ message: 'Gagal terhubung ke database.' });
  }
});
// Rute untuk menjalankan query dinamis
app.post('/api/query', async (req, res) => {
  // Ambil query SQL dari body permintaan yang dikirim React
  const { query } = req.body;

  // Validasi sederhana, jangan jalankan query kosong
  if (!query) {
    return res.status(400).json({ error: 'Query tidak boleh kosong.' });
  }

  try {
    // Jalankan query yang diterima dari frontend
    const [rows] = await pool.query(query);
    // Kirim hasilnya kembali
    res.status(200).json({ data: rows });
  } catch (error) {
    // Jika query salah (syntax error, dll), kirim pesan eror yang jelas
    console.error('SQL Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// 6. Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});