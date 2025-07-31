import { useQueryRunner } from '../hooks/useQueryRunner';
import QueryTerminal from '../components/QueryTerminal';
import QueryResult from '../components/QueryResult';
import LessonLayout from '../components/LessonLayout';

function MateriViewIndex() {
  const { results, error, isLoading, successMessage, runQuery } = useQueryRunner();

  return (
    <LessonLayout title="Materi 11: Struktur & Performa (`VIEW` & `INDEX`)">
      <p className="materi-deskripsi">
        Selamat! Ini adalah materi terakhir kita di tingkat lanjut. Sekarang, kita akan belajar membuat "jalan pintas" dan "jalur cepat" di taman data kita agar lebih efisien.
      </p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li>
          <code>CREATE VIEW</code>: Perintah ini seperti membuat <strong>jendela pajangan khusus</strong> di taman Anda. Anda membuat sebuah query yang rumit (misalnya, mencari mawar terbaik), lalu menyimpannya sebagai sebuah "pemandangan" (VIEW). Setelah itu, Anda bisa melihat hasilnya kapan saja dengan query yang jauh lebih singkat, seolah-olah itu adalah tabel biasa.
        </li>
        <li>
          <code>CREATE INDEX</code>: Perintah ini seperti membuat <strong>daftar isi</strong> untuk sebuah buku. Jika Anda sering mencari data berdasarkan kolom tertentu (misalnya, mencari mawar berdasarkan `warna`), INDEX akan membuat proses pencarian itu menjadi super cepat.
        </li>
      </ul>
      <p className="materi-deskripsi">
        Mari kita coba <strong>membuat sebuah VIEW</strong> yang kita beri nama `v_mawar_terbaik`. Jendela ini akan selalu menampilkan mawar yang tingginya di atas 30 cm.
      </p>
      <p className="mt-4 mb-2"><strong>Langkah 1: Buat 'Jendela Pajangan'-nya dulu.</strong></p>

      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: CREATE VIEW v_mawar_terbaik AS SELECT warna, tinggi_cm FROM mawar WHERE tinggi_cm > 30;" 
      />
      
      {/* Pesan sukses atau error akan muncul di sini */}
      <QueryResult 
        results={results} 
        error={error} 
        isLoading={isLoading} 
        successMessage={successMessage} 
      />

      <p className="mt-8 mb-2"><strong>Langkah 2: Setelah berhasil, coba 'intip' lewat jendela baru Anda.</strong> (Hapus query di atas dan jalankan yang ini)</p>
      
      {/* Menambahkan terminal kedua untuk contoh penggunaan */}
      <QueryTerminal 
        onRunQuery={runQuery} 
        placeholderQuery="Contoh: SELECT * FROM v_mawar_terbaik;" 
      />
    </LessonLayout>
  );
}

export default MateriViewIndex;