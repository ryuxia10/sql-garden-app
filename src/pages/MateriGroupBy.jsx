import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriGroupBy() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 6: Menghitung Panen (`GROUP BY` & Aggregates)">
      <p className="materi-deskripsi">
        Sebagai analis kebun, Anda perlu tahu ringkasan data. Misalnya, "Ada berapa mawar merah?".
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><strong>Fungsi Agregat</strong>: Perintah perhitungan seperti <code>COUNT(*)</code> (hitung jumlah), <code>AVG()</code> (rata-rata), dll.</li>
        <li><code>GROUP BY [nama_kolom]</code>: Mengelompokkan baris yang sama untuk dihitung oleh fungsi agregat.</li>
        <li><code>AS</code>: Kata kunci untuk memberi nama alias pada kolom hasil perhitungan.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba hitung ada berapa banyak bunga untuk setiap warna yang ada di petak mawar.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT warna, COUNT(*) AS jumlah_bunga FROM mawar GROUP BY warna;" 
      />
      <QueryResult 
        results={results} 
        error={error} 
        isLoading={isLoading} 
        successMessage={successMessage} 
      />
    </LessonLayout>
  );
}

export default MateriGroupBy;