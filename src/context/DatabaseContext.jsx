import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as alasql from 'alasql';

const DatabaseContext = createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const [db, setDb] = useState(null);
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  const initializeDatabase = useCallback(async () => {
    console.log("Menginisialisasi atau mereset database sandbox...");
    setIsDbLoading(true);
    setDbError(null);
    try {
      const response = await fetch('/api/get-initial-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const sandboxDb = new alasql.Database();
      sandboxDb.exec('DROP TABLE IF EXISTS mawar; CREATE TABLE mawar (id INT PRIMARY KEY, warna VARCHAR(50), tinggi_cm INT, asal_bibit VARCHAR(50));');
      sandboxDb.exec('INSERT INTO mawar SELECT * FROM ?', [data.mawar]);
      sandboxDb.exec('DROP TABLE IF EXISTS info_daerah; CREATE TABLE info_daerah (nama_daerah VARCHAR(50) PRIMARY KEY, tingkat_kesuburan VARCHAR(20), ketinggian_mdpl INT);');
      sandboxDb.exec('INSERT INTO info_daerah SELECT * FROM ?', [data.info_daerah]);

      setDb(sandboxDb);
    } catch (error) {
      console.error("Gagal memuat data awal:", error);
      setDbError("Gagal memuat data awal dari server. Coba refresh halaman.");
    } finally {
      setIsDbLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  const value = {
    db,
    isDbLoading,
    dbError,
    resetSandbox: initializeDatabase, // Fungsi reset kita adalah inisialisasi ulang
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}