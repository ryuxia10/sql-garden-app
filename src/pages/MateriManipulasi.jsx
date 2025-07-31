import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriManipulasi() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 7: Merawat Aktif (`INSERT`, `UPDATE`, `DELETE`)">
      {/* KOTAK PERINGATAN BARU */}
      <div className="mb-6 p-4 rounded-lg border bg-amber-500/10 text-amber-700 dark:text-amber-300">
        <p className="font-bold">Peringatan</p>
        <p>Menghapus, menambah, atau memperbarui data akan menyebabkan halaman menjadi blank untuk sementara. Cukup **lakukan refresh (F5)** agar halaman kembali normal dan sandbox Anda di-reset.</p>
      </div>

      <p className="materi-deskripsi">
        Anda sekarang akan belajar memanipulasi taman secara langsung. Ini adalah perintah yang kuat, jadi gunakan dengan hati-hati!
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li><code>INSERT INTO</code>: Menanam benih baru.</li>
        <li><code>UPDATE</code>: Memberi nutrisi atau mengubah data bunga.</li>
        <li><code>DELETE FROM</code>: Mencabut bunga dari taman.</li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba tanam Mawar Ungu baru dengan ID yang belum terpakai (misal: 9).
      </p>
      <p className="mt-4 mb-2"><strong>Coba tulis mantra berikut di terminal:</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: INSERT INTO mawar (id, warna, tinggi_cm, asal_bibit) VALUES (9, 'Ungu', 22, 'Surabaya');" 
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

export default MateriManipulasi;