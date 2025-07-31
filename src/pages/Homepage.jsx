import React from 'react';
import { Button } from "@/components/ui/button"; // Tombol dari shadcn

// Kita terima prop 'onStart' yang akan menjadi fungsi untuk memulai belajar
function Homepage({ onStart }) {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold">
        Selamat Datang di <span className="text-primary">SQL Garden</span> 🌷
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Belajar SQL tidak pernah semenyenangkan ini. Di sini, Anda akan belajar menanam, merawat, dan memanen data layaknya seorang pekebun profesional. Tidak perlu pengalaman, hanya rasa ingin tahu.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={onStart}>
          Mulai Berkebun Sekarang
        </Button>
      </div>
    </div>
  );
}

export default Homepage;