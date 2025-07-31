import { useState } from 'react';

export function useQueryRunner() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State baru untuk loading
  const [successMessage, setSuccessMessage] = useState('');

  const runQuery = async (query) => {
    setResults(null);
    setError(null);
    setIsLoading(true); // Mulai loading
    setSuccessMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
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
      setIsLoading(false); // Hentikan loading, baik berhasil maupun gagal
    }
  };

  return { results, error, isLoading, successMessage, runQuery };
}