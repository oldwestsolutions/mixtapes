'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Navigation items for mobile menu only
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

// Library items
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

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [libraryMenuOpen, setLibraryMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(30);
  const [showPlayerControls, setShowPlayerControls] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const libraryMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const playerControlsRef = useRef<HTMLDivElement>(null);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle clicking outside of menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (libraryMenuRef.current && !libraryMenuRef.current.contains(event.target as Node)) {
        setLibraryMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target instanceof Element && event.target.closest('button[aria-label="Toggle mobile menu"]'))) {
        setMobileMenuOpen(false);
      }
      if (playerControlsRef.current && !playerControlsRef.current.contains(event.target as Node) &&
          !(event.target instanceof Element && event.target.closest('.player-artwork'))) {
        setShowPlayerControls(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setLibraryMenuOpen(false);
        setMobileMenuOpen(false);
        setShowPlayerControls(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);
  
  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any credentials
    setIsLoggedIn(true);
    setEmail('');
    setPassword('');
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    
    // Navigate to dashboard
    router.push('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  // Effect to set CSS variable for header height
  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', '4rem'); // 64px
  }, []);
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[var(--header-height)] ${isScrolled ? 'bg-[var(--background)]/95 backdrop-blur-md shadow-sm' : 'bg-[var(--background)]'}`}>
        {/* Main header */}
        <div className="container h-full mx-auto px-4 flex items-center justify-between">
          {/* Left section: Mobile menu button, logo */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 text-[var(--foreground)]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              )}
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[var(--primary)]">
                <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
              </svg>
              <h1 className="text-xl font-semibold text-[var(--foreground)] hidden sm:flex">
                <span className="text-[var(--primary)]">mixtapes</span><span className="opacity-60">.net</span>
              </h1>
            </Link>
          </div>
          
          {/* Right section: Search, library and user */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile player button - shows album artwork */}
            <button 
              className="lg:hidden h-9 w-9 rounded-md overflow-hidden flex items-center justify-center relative shadow-sm"
              onClick={() => setShowPlayerControls(!showPlayerControls)}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--primary)]">
                  <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
            
            {/* Search bar with fixed icon-text spacing */}
            <div className="relative w-44 sm:w-52 md:w-64">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search mixtapes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-12 pr-4 rounded-lg bg-[var(--muted)]/70 border border-[var(--border)] outline-none transition-all text-sm focus:bg-[var(--background)] focus:ring-2 focus:ring-[var(--primary)]/30"
              />
            </div>
            
            {/* Desktop music player trigger */}
            <div 
              className="hidden lg:flex relative h-10 w-10 rounded-md overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:scale-105"
              onClick={() => setShowPlayerControls(!showPlayerControls)}
            >
              {/* Album artwork */}
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--primary)]">
                  <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Play indicator overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Expanded player controls */}
            {showPlayerControls && (
              <div 
                ref={playerControlsRef}
                className="absolute top-full right-16 mt-3 w-80 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-3 z-50 fade-in"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-14 w-14 bg-[var(--muted)] rounded-md overflow-hidden shadow-sm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--primary)]">
                        <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm mb-1">Currently no mixtape selected</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">Select a mixtape to play</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <div className="flex items-center gap-5 justify-center">
                    <button className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 20 9 12l10-8v16Z" />
                        <path d="M5 19V5" />
                      </svg>
                    </button>
                    
                    <button 
                      className="h-10 w-10 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:scale-105 transition-transform"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>
                    
                    <button className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 4 10 8-10 8V4Z" />
                        <path d="M19 5v14" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="w-full flex items-center gap-2 text-xs mt-2">
                    <span className="text-[var(--muted-foreground)]">0:00</span>
                    <div className="flex-1 h-1 bg-[var(--muted)] rounded-full overflow-hidden group cursor-pointer">
                      <div 
                        className="h-full bg-[var(--foreground)] group-hover:bg-[var(--primary)] transition-colors"
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                    <span className="text-[var(--muted-foreground)]">3:45</span>
                  </div>
                  
                  <div className="w-full flex items-center gap-2 mt-2">
                    <button className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      </svg>
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-1 appearance-none bg-[var(--muted)] rounded-full overflow-hidden cursor-pointer"
                      style={{ 
                        background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${volume}%, var(--muted) ${volume}%, var(--muted) 100%)` 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors border ${
                  isLoggedIn 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-[var(--muted)]/70 text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]'
                }`}
                aria-label="User menu"
              >
                {isLoggedIn ? (
                  <span className="text-sm font-semibold">U</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-3 z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-3 mb-3 p-2">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          U
                        </div>
                        <div>
                          <h3 className="font-medium">User</h3>
                          <p className="text-xs text-[var(--muted-foreground)]">user@example.com</p>
                        </div>
                      </div>
                      <div className="border-t border-[var(--border)] pt-2">
                        <Link 
                          href="/dashboard"
                          className="flex items-center p-2 rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                            <line x1="9" y1="21" x2="9" y2="9" />
                          </svg>
                          Dashboard
                        </Link>
                        <Link 
                          href="/account"
                          className="flex items-center p-2 rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          Account Settings
                        </Link>
                        <div className="p-2 rounded-md text-sm bg-[var(--muted)] mt-2">
                          <h3 className="font-medium text-sm mb-2">Upgrade to Pro</h3>
                          <p className="text-xs text-[var(--muted-foreground)] mb-3">Get unlimited access to millions of mixtapes</p>
                          <button className="w-full text-xs bg-[var(--primary)] text-white py-1.5 px-3 rounded-full font-medium">
                            Upgrade Now
                          </button>
                        </div>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center p-2 rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--muted)] mt-1 transition-colors"
                        >
                          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Log out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-2">
                      <h3 className="font-medium text-sm mb-3 text-center">Login</h3>
                      <form onSubmit={handleLogin} className="flex flex-col gap-3">
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs bg-[var(--background)] border border-[var(--border)] py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full text-xs bg-[var(--background)] border border-[var(--border)] py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        />
                        <button 
                          type="submit" 
                          className="w-full text-xs bg-[var(--primary)] text-white py-1.5 px-3 rounded-full font-medium"
                        >
                          Log in
                        </button>
                        <div className="text-center">
                          <Link 
                            href="/signup" 
                            className="text-xs text-[var(--primary)] hover:underline"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Create account
                          </Link>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile player controls - appears when tapped */}
      {showPlayerControls && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setShowPlayerControls(false)}>
          <div 
            ref={playerControlsRef}
            className="fixed top-[calc(var(--header-height)+0.75rem)] right-4 left-4 w-auto bg-[var(--background)] border border-[var(--border)] p-4 rounded-lg shadow-lg transform transition-transform fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-14 w-14 bg-[var(--muted)] rounded-md overflow-hidden shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--primary)]">
                    <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-1">Currently no mixtape selected</h3>
                <p className="text-xs text-[var(--muted-foreground)]">Select a mixtape to play</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="flex items-center gap-7 justify-center">
                <button className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 20 9 12l10-8v16Z" />
                    <path d="M5 19V5" />
                  </svg>
                </button>
                
                <button 
                  className="h-10 w-10 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:scale-105 transition-transform"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
                
                <button className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 4 10 8-10 8V4Z" />
                    <path d="M19 5v14" />
                  </svg>
                </button>
              </div>
              
              <div className="w-full flex items-center gap-2 text-xs mt-2">
                <span className="text-[var(--muted-foreground)]">0:00</span>
                <div className="flex-1 h-1 bg-[var(--muted)] rounded-full overflow-hidden group cursor-pointer">
                  <div 
                    className="h-full bg-[var(--foreground)] group-hover:bg-[var(--primary)] transition-colors"
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <span className="text-[var(--muted-foreground)]">3:45</span>
              </div>
              
              <div className="w-full flex items-center gap-2 mt-2">
                <button className="text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  </svg>
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 appearance-none bg-[var(--muted)] rounded-full overflow-hidden cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${volume}%, var(--muted) ${volume}%, var(--muted) 100%)` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile menu - Sidebar replacement */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            ref={mobileMenuRef}
            className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-[var(--background)] shadow-xl overflow-y-auto z-50 transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu content */}
            <div className="p-5 flex items-center gap-2 border-b border-[var(--border)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[var(--primary)]">
                <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
              </svg>
              <h1 className="text-xl font-semibold text-[var(--foreground)]">
                <span className="text-[var(--primary)]">mixtapes</span><span className="opacity-60">.net</span>
              </h1>
            </div>
            
            {/* Mobile search */}
            <div className="p-4 border-b border-[var(--border)]">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search mixtapes..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full h-10 pl-12 pr-4 rounded-lg bg-[var(--muted)]/70 border border-[var(--border)] outline-none transition-all text-sm focus:bg-[var(--background)] focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            </div>
            
            {/* Mobile navigation */}
            <nav className="mt-2 pb-2 border-b border-[var(--border)]">
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile library section */}
            <div className="mt-4 px-3 border-b border-[var(--border)] pb-4">
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-3 opacity-70">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile user section */}
            <div className="mt-4 px-6 pb-6">
              {isLoggedIn ? (
                <div className="p-4 rounded-lg bg-[var(--muted)] text-center">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">User</h3>
                      <p className="text-xs text-[var(--muted-foreground)]">user@example.com</p>
                    </div>
                  </div>
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
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs bg-[var(--background)] border border-[var(--border)] py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                    />
                    <button 
                      type="submit" 
                      className="w-full text-xs bg-[var(--primary)] text-white py-1.5 px-3 rounded-full font-medium"
                    >
                      Log in
                    </button>
                    <div className="text-center">
                      <Link 
                        href="/signup" 
                        className="text-xs text-[var(--primary)] hover:underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Create account
                      </Link>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 