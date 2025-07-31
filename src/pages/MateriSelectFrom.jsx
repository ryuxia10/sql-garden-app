import { useQueryRunner } from '../hooks/useQueryRunner'; // Impor mesin kita
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriSelectFrom() {
  // Gunakan mesinnya! Semua state dan logika fetch ada di sini.
  const { results, error, isLoading, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 1: Melihat Bunga di Taman (`SELECT` & `FROM`)">
      <p className="materi-deskripsi">
        Selamat datang di taman pertama Anda! Dua perintah paling dasar dalam SQL adalah <strong>SELECT</strong> dan <strong>FROM</strong>.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>SELECT</code> adalah perintah untuk "MEMILIH" atau "MELIHAT" bunga.</li>
        <li><code>FROM</code> adalah perintah untuk memberitahu "DARI" petak bunga mana.</li>
      </ul>
      <p className="materi-deskripsi">
        Gunakan tanda bintang <strong>*</strong> yang berarti "semuanya" untuk melihat semua ciri bunga.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} // Langsung gunakan fungsi dari mesin
        placeholderQuery="Contoh: SELECT * FROM mawar;" 
      />
      <QueryResult 
        results={results} 
        error={error} 
        isLoading={isLoading} // Berikan status loading
      />
    </LessonLayout>
  );
}

export default MateriSelectFrom;