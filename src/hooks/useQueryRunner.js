import { useState, useEffect } from 'react';
// PERBAIKAN DI SINI: Ubah cara kita mengimpor alasql
import * as alasql from 'alasql';

// Buat database alasql satu kali saja
const sandboxDb = new alasql.Database();

// State untuk menyimpan status data awal
let initialDataPromise = null;

// Fungsi untuk mengambil data awal dari server
const fetchInitialData = async () => {
  try {
    const response = await fetch('/api/get-initial-data');
    const data = await response.json();

    // Buat ulang tabel dan isi dengan data bersih
    sandboxDb.exec('DROP TABLE IF EXISTS mawar; CREATE TABLE mawar (id INT PRIMARY KEY, warna VARCHAR(50), tinggi_cm INT, asal_bibit VARCHAR(50));');
    sandboxDb.exec('INSERT INTO mawar SELECT * FROM ?', [data.mawar]);

    sandboxDb.exec('DROP TABLE IF EXISTS info_daerah; CREATE TABLE info_daerah (nama_daerah VARCHAR(50) PRIMARY KEY, tingkat_kesuburan VARCHAR(20), ketinggian_mdpl INT);');
    sandboxDb.exec('INSERT INTO info_daerah SELECT * FROM ?', [data.info_daerah]);

    return true;
  } catch (error) {
    console.error("Gagal mengambil data awal:", error);
    return false;
  }
};

export function useQueryRunner() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading saat pertama kali
  const [successMessage, setSuccessMessage] = useState('');

  // Ambil data awal saat hook pertama kali digunakan
  useEffect(() => {
    if (!initialDataPromise) {
      initialDataPromise = fetchInitialData();
    }
    initialDataPromise.then(success => {
      if (!success) {
        setError("Gagal memuat data awal dari server. Coba refresh halaman.");
      }
      setIsLoading(false);
    });
  }, []);

  const runQuery = (query) => {
    setResults(null);
    setError(null);
    setSuccessMessage('');
    setIsLoading(true);

    // Jalankan query langsung di alasql (frontend)
    try {
      const res = sandboxDb.exec(query);
      const queryType = query.trim().toUpperCase().split(' ')[0];

      if (['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP'].includes(queryType)) {
        const affectedRows = res[0]?.affectedRows ?? res;
        setSuccessMessage(`Query berhasil! ${affectedRows} baris terpengaruh.`);
        setResults(null);
      } else {
        setResults(res);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { results, error, isLoading, successMessage, runQuery };
}