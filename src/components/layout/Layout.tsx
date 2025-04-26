import React from 'react';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[var(--header-height)] container pb-8">
        {children}
      </main>
    </div>
  );
} 