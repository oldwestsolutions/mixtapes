import React from 'react';
import Header from './Header';
import Player from './Player';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[var(--header-height)] container pb-24">
        {children}
      </main>
      <Player />
    </div>
  );
} 