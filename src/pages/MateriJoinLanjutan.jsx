import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriJoinLanjutan() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 8: Join Lanjutan (`LEFT JOIN`)">
      <p className="materi-deskripsi">
        <code>INNER JOIN</code> hanya menampilkan data yang memiliki pasangan. <strong>LEFT JOIN</strong> akan menampilkan SEMUA data dari tabel kiri, bahkan yang tidak punya pasangan.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>LEFT JOIN</code>: Mengambil semua baris dari tabel kiri, dan data yang cocok dari tabel kanan. Jika tidak cocok, hasilnya NULL.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba tampilkan semua mawar kita dan lihat apa yang terjadi pada "Mawar Pink" dari Cianjur.
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT mawar.warna, mawar.asal_bibit, info_daerah.tingkat_kesuburan FROM mawar LEFT JOIN info_daerah ON mawar.asal_bibit = info_daerah.nama_daerah;" 
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

export default MateriJoinLanjutan;