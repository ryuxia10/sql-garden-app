import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriSubquery() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 9: Query Bersarang (Subquery)">
      <p className="materi-deskripsi">
        Subquery adalah sebuah query <code>SELECT</code> yang disarangkan di dalam query lain. Hasil dari query dalam akan digunakan oleh query luar.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li>Subquery akan dieksekusi terlebih dahulu.</li>
        <li>Subquery harus selalu berada di dalam tanda kurung <code>()</code>.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita cari semua mawar yang tingginya di atas rata-rata tinggi semua mawar.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT * FROM mawar WHERE tinggi_cm > (SELECT AVG(tinggi_cm) FROM mawar);" 
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

export default MateriSubquery;