'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { 
    name: 'Listen Now', 
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  },
  { 
    name: 'Browse', 
    path: '/browse',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  },
  { 
    name: 'Radio', 
    path: '/radio',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
        <circle cx="12" cy="12" r="2" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
      </svg>
    )
  },
  { 
    name: 'Search', 
    path: '/search',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  },
];

const libraryItems = [
  { 
    name: 'Recent Mixtapes', 
    path: '/recent',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  { 
    name: 'My Collection', 
    path: '/collection',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    )
  },
  { 
    name: 'Favorite Tracks', 
    path: '/favorites',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      </svg>
    )
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <aside className="fixed top-0 left-0 h-full w-[var(--sidebar-width)] border-r border-r-[var(--border)] bg-[var(--background)] overflow-y-auto z-50">
      <div className="p-5 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[var(--primary)]">
          <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          <span className="text-[var(--primary)]">mixtapes</span><span className="opacity-60">.net</span>
        </h1>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                  pathname === item.path 
                    ? 'bg-[var(--primary)] text-white font-medium' 
                    : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-10 px-3">
        <div className="px-3 mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
            Library
          </h2>
          <button className="h-5 w-5 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] hover:bg-opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
        <ul className="space-y-1">
          {libraryItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors text-sm ${
                  pathname === item.path 
                    ? 'text-[var(--primary)] font-medium bg-[var(--muted)]' 
                    : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                }`}
              >
                <span className="mr-3 opacity-70">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 px-6">
        {isLoggedIn ? (
          <div className="p-4 rounded-lg bg-[var(--muted)] text-center">
            <h3 className="font-medium text-sm mb-2">Upgrade to Pro</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-3">Get unlimited access to millions of mixtapes</p>
            <div className="flex flex-col gap-2">
              <button className="w-full text-xs bg-[var(--primary)] text-white py-1.5 px-3 rounded-full font-medium">
                Upgrade Now
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-xs text-[var(--foreground)] py-1 hover:underline"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-[var(--muted)]">
            <h3 className="font-medium text-sm mb-3 text-center">Login</h3>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-[var(--background)] border border-[var(--border)] py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-[var(--background)] border border-[var(--border)] py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                required
              />
              <button 
                type="submit" 
                className="w-full text-xs bg-[var(--primary)] text-white py-1.5 px-3 rounded-full font-medium"
              >
                Log in
              </button>
              <div className="text-center">
                <Link href="/signup" className="text-xs text-[var(--primary)] hover:underline">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
} 