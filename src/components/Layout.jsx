import React from 'react';
import { ModeToggle } from './ModeToggle';
import { ResetButton } from './ResetButton';

function Layout({ children, onLogoClick, centerContent = false }) {
  const mainClasses = `flex-grow p-4 md:p-8 ${centerContent ? 'flex items-center justify-center' : ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* --- BAGIAN HEADER YANG DIPERBARUI --- */}
      <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center gap-4">
        
        {/* Bagian Kiri: Judul */}
        <button onClick={onLogoClick} className="text-2xl font-bold bg-transparent border-none cursor-pointer text-primary-foreground flex-shrink-0">
          SQL Garden 🌷
        </button>
        
        {/* Bagian Tengah: Tulisan Berjalan */}
        {/* flex-1 akan membuat div ini mengisi semua ruang kosong */}
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <p className="animate-marquee">
            Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ Sebuah Karya oleh Reza Dwiky Anggara ✨ Sebuah Karya oleh Reza Dwiky Anggara✨ 
          </p>
        </div>
        
        {/* Bagian Kanan: Tombol-tombol Aksi */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ResetButton />
          <ModeToggle />
        </div>

      </header>
      
      <main className={mainClasses}>
        {children}
      </main>
    </div>
  );
}

export default Layout;