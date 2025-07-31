import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

    const sessionId = getSessionId();

    try {
      const response = await fetch(`/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, sessionId: sessionId })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        if (result.data && result.data.affectedRows !== undefined) {
          setSuccessMessage(`Query berhasil! ${result.data.affectedRows} baris terpengaruh.`);
          setResults(null);
        } else {
          setResults(result.data);
        }
      } else {
        setError(result.error || 'Terjadi kesalahan pada server.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Periksa koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return { results, error, isLoading, successMessage, runQuery };
}