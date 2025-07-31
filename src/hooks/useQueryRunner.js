import { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext'; // Impor hook context kita

export function useQueryRunner() {
  const { db, isDbLoading, dbError } = useDatabase(); // Ambil database dari context
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const runQuery = (query) => {
    if (isDbLoading || dbError) return; // Jangan jalankan jika DB belum siap

    setResults(null);
    setError(null);
    setSuccessMessage('');
    setIsLoading(true);

    // Beri sedikit jeda agar loading spinner terlihat
    setTimeout(() => {
      try {
        const res = db.exec(query);
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
    }, 300); // Jeda 300ms
  };

  return { results, error: error || dbError, isLoading: isLoading || isDbLoading, successMessage, runQuery };
}