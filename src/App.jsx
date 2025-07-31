import { useState } from 'react';
import Layout from './components/Layout';
import { Button } from "@/components/ui/button";
import Homepage from './pages/Homepage';

// Impor semua halaman materi Anda
import MateriSelectFrom from './pages/MateriSelectFrom';
import MateriWhere from './pages/MateriWhere';
import MateriAndOr from './pages/MateriAndOr';
import MateriOrderByLimit from './pages/MateriOrderByLimit';
import MateriJoin from './pages/MateriJoin';
import MateriGroupBy from './pages/MateriGroupBy';
import MateriManipulasi from './pages/MateriManipulasi';
import MateriJoinLanjutan from './pages/MateriJoinLanjutan';
import MateriSubquery from './pages/MateriSubquery';
import MateriCase from './pages/MateriCase';
import MateriViewIndex from './pages/MateriViewIndex';

function App() {
  const [halamanAktif, setHalamanAktif] = useState('home');

  const daftarMateri = [
    { id: 'materi1', judul: '1: SELECT & FROM', komponen: <MateriSelectFrom /> },
    { id: 'materi2', judul: '2: WHERE', komponen: <MateriWhere /> },
    { id: 'materi3', judul: '3: AND & OR', komponen: <MateriAndOr /> },
    { id: 'materi4', judul: '4: ORDER BY & LIMIT', komponen: <MateriOrderByLimit /> },
    { id: 'materi5', judul: '5: JOIN', komponen: <MateriJoin /> },
    { id: 'materi6', judul: '6: GROUP BY', komponen: <MateriGroupBy /> },
    { id: 'materi7', judul: '7: Manipulasi Data', komponen: <MateriManipulasi /> },
    { id: 'materi8', judul: '8: JOIN Lanjutan', komponen: <MateriJoinLanjutan /> },
    { id: 'materi9', judul: '9: Subquery', komponen: <MateriSubquery /> },
    { id: 'materi10', judul: '10: CASE', komponen: <MateriCase /> },
    { id: 'materi11', judul: '11: VIEW & INDEX', komponen: <MateriViewIndex /> },
  ];

  const handleStartLearning = () => {
    setHalamanAktif('materi1');
  };

  const goToHome = () => {
    setHalamanAktif('home');
  }

  return (
    // Kita berikan properti 'centerContent' hanya jika sedang di homepage
    <Layout onLogoClick={goToHome} centerContent={halamanAktif === 'home'}>
      {halamanAktif === 'home' ? (
        <Homepage onStart={handleStartLearning} />
      ) : (
        <>
          <nav className="flex flex-wrap gap-2 mb-8 pb-4 border-b">
            {daftarMateri.map((materi) => (
              <Button
                key={materi.id}
                variant={halamanAktif === materi.id ? 'default' : 'ghost'}
                onClick={() => setHalamanAktif(materi.id)}
              >
                {materi.judul}
              </Button>
            ))}
          </nav>
          
          <div className="konten-materi">
            {/* Langsung render komponen tanpa AnimatedPage */}
            {daftarMateri.find(materi => materi.id === halamanAktif)?.komponen}
          </div>
        </>
      )}
    </Layout>
  );
}

export default App;