import React from 'react';
import { ModeToggle } from './ModeToggle';
import { ResetButton } from './ResetButton';

function Layout({ children, onLogoClick, centerContent = false }) {
  const mainClasses = `flex-grow p-4 md:p-8 ${centerContent ? 'flex items-center justify-center' : ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center justify-between">
        <button onClick={onLogoClick} className="text-2xl font-bold bg-transparent border-none cursor-pointer text-primary-foreground">
          SQL Garden 🌷
        </button>
        
        <div className="flex items-center gap-2">
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