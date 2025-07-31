import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriAndOr() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 3: Filter Canggih (`AND`, `OR`, {'>'})">
      <p className="materi-deskripsi">
        Terkadang satu filter saja tidak cukup. Di sinilah <strong>AND</strong> dan <strong>OR</strong> berguna untuk menggabungkan beberapa kondisi.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>AND</code>: Menampilkan data jika <strong>semua kondisi</strong> terpenuhi.</li>
        <li><code>OR</code>: Menampilkan data jika <strong>salah satu kondisi</strong> terpenuhi.</li>
        <li>Kita juga bisa menggunakan operator perbandingan angka seperti <code>{'>'}</code> (lebih dari), <code>{'<'}</code> (kurang dari), atau <code>=</code> pada kolom angka.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba cari mawar merah yang berasal dari Bandung.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT * FROM mawar WHERE warna = 'Merah' AND asal_bibit = 'Bandung';" 
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

export default MateriAndOr;