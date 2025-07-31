import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriJoin() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 5: Menggabungkan Informasi (`INNER JOIN`)">
      <p className="materi-deskripsi">
        Inilah kekuatan sejati database relasional! Dengan <strong>JOIN</strong>, kita bisa menggabungkan baris dari dua atau lebih tabel berdasarkan kolom yang berhubungan.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>INNER JOIN</code>: Perintah untuk menggabungkan dua tabel.</li>
        <li><code>ON</code>: Kondisi yang memberitahu SQL bagaimana cara menghubungkan kedua tabel tersebut (kolom mana yang cocok).</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba tampilkan warna mawar dan gabungkan dengan informasi tingkat kesuburan dari daerah asalnya.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT mawar.warna, mawar.asal_bibit, info_daerah.tingkat_kesuburan FROM mawar INNER JOIN info_daerah ON mawar.asal_bibit = info_daerah.nama_daerah;" 
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

export default MateriJoin;