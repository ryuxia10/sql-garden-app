import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriWhere() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 2: Filter Bunga dengan `WHERE`">
      <p className="materi-deskripsi">
        Hebat! Anda sudah bisa melihat semua bunga di sebuah petak. Tapi bagaimana jika Anda hanya ingin melihat bunga dengan ciri-ciri tertentu? Di sinilah perintah <strong>WHERE</strong> berperan.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>WHERE</code> digunakan untuk memfilter data dan hanya menampilkan baris yang memenuhi kondisi tertentu.</li>
        <li>Untuk teks (seperti warna), kondisinya harus di dalam tanda kutip, contoh: <code>warna = 'Merah'</code>.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba cari semua mawar yang warnanya 'Merah'.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT * FROM mawar WHERE warna = 'Merah';" 
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

export default MateriWhere;