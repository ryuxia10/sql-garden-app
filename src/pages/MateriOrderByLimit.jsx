import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriOrderByLimit() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 4: Menata Etalase (`ORDER BY` & `LIMIT`)">
      <p className="materi-deskripsi">
        Anda sudah bisa memanen data, sekarang saatnya menatanya di "etalase" agar indah. Di sinilah <strong>ORDER BY</strong> dan <strong>LIMIT</strong> sangat berguna.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>ORDER BY [nama_kolom]</code>: Mengurutkan hasil. Tambahkan <code>ASC</code> untuk urutan menaik atau <code>DESC</code> untuk urutan menurun.</li>
        <li><code>LIMIT [jumlah]</code>: Membatasi jumlah baris data yang ditampilkan.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba tampilkan 3 mawar tertinggi, diurutkan dari yang paling tinggi ke yang paling rendah.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT * FROM mawar ORDER BY tinggi_cm DESC LIMIT 3;" 
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

export default MateriOrderByLimit;