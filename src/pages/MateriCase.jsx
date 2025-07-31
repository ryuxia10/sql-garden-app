import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriCase() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 10: Memberi Label dengan `CASE`">
      <p className="materi-deskripsi">
        Pernyataan <strong>CASE</strong> berfungsi seperti logika "jika-maka-lainnya" langsung di dalam query Anda untuk membuat kolom baru yang dinamis.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li>Struktur dasarnya adalah <code>CASE WHEN [kondisi] THEN [hasil] ELSE [hasil_lainnya] END</code>.</li>
        <li>Jangan lupa diakhiri dengan <code>END</code> dan berikan nama alias pada kolom baru menggunakan <code>AS</code>.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita beri label 'Bibit Unggul' pada mawar yang tingginya di atas 30 cm.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT warna, tinggi_cm, CASE WHEN tinggi_cm > 30 THEN 'Bibit Unggul' ELSE 'Standar' END AS status_bibit FROM mawar;" 
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

export default MateriCase;