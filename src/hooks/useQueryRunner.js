import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Impor fungsi pembuat ID

// Fungsi untuk mendapatkan atau membuat Session ID di browser
function getSessionId() {
  let sessionId = localStorage.getItem('sqlGardenSessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('sqlGardenSessionId', sessionId);
  }
  return sessionId;
}

export function useQueryRunner() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const runQuery = async (query) => {
    setResults(null);
    setError(null);
    setIsLoading(true);
    setSuccessMessage('');

    // Ambil ID sesi unik untuk pengguna ini
    const sessionId = getSessionId();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Kirim query DAN sessionId ke server
        body: JSON.stringify({ query: query, sessionId: sessionId })
      });

      const result = await response.json();
      if (response.ok) {
        if (result.data.affectedRows > 0) {
          setSuccessMessage(`Query berhasil! ${result.data.affectedRows} baris terpengaruh.`);
        } else {
          setResults(result.data);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan server backend berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  return { results, error, isLoading, successMessage, runQuery };
}