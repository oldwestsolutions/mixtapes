'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardPlayer from '@/components/music/DashboardPlayer';
import MusicLibrary from '@/components/music/MusicLibrary';

// Dashboard stats
const stats = [
  { 
    name: 'Mixtapes Played', 
    value: '27', 
    change: '+12%',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  },
  { 
    name: 'Favorites', 
    value: '16', 
    change: '+3',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      </svg>
    )
  },
  { 
    name: 'Listening Time', 
    value: '18h', 
    change: '+2h',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  { 
    name: 'Following', 
    value: '42', 
    change: '+5',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
];

// Recent mixtapes
const recentMixtapes = [
  {
    id: 1,
    title: "Summer Vibes 2023",
    artist: "DJ Sunshine",
    duration: "47:22",
    coverImage: "/placeholder.svg",
    plays: 287,
  },
  {
    id: 2,
    title: "Late Night Beats",
    artist: "Chill Master",
    duration: "52:14",
    coverImage: "/placeholder.svg",
    plays: 164,
  },
  {
    id: 3,
    title: "Workout Mix Vol. 3",
    artist: "Fitness Beats",
    duration: "58:04",
    coverImage: "/placeholder.svg",
    plays: 203,
  },
  {
    id: 4,
    title: "Hip Hop Classics",
    artist: "Urban Legends",
    duration: "63:19",
    coverImage: "/placeholder.svg",
    plays: 429,
  },
  {
    id: 5,
    title: "Indie Discoveries",
    artist: "Alternative Sounds",
    duration: "39:45",
    coverImage: "/placeholder.svg",
    plays: 136,
  },
];

// Suggested artists/creators
const suggestedArtists = [
  {
    id: 1,
    name: "DJ RhythmX",
    followers: "42.5K",
    imageSrc: "/placeholder.svg",
    isFollowing: false,
  },
  {
    id: 2,
    name: "Beat Collective",
    followers: "128K",
    imageSrc: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: 3,
    name: "Melody Makers",
    followers: "57.2K",
    imageSrc: "/placeholder.svg",
    isFollowing: false,
  },
  {
    id: 4,
    name: "Sonic Dreams",
    followers: "91.7K",
    imageSrc: "/placeholder.svg",
    isFollowing: false,
  },
];

export default function Dashboard() {
  const [followingStatus, setFollowingStatus] = useState<{[key: number]: boolean}>({
    1: false,
    2: true,
    3: false,
    4: false,
  });

  const toggleFollow = (id: number) => {
    setFollowingStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="pt-[calc(var(--header-height)+1rem)] pb-20">
      <div className="container mx-auto px-4">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Welcome back, User!</h1>
          <p className="text-[var(--muted-foreground)]">Here&apos;s what&apos;s happening with your music today.</p>
        </div>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">{stat.name}</p>
                  <h3 className="text-2xl font-bold mt-1 mb-2">{stat.value}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {stat.change} this week
                  </span>
                </div>
                <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Now Playing and Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Music Player with Visualizer */}
            <DashboardPlayer />
            
            {/* Recently played mixtapes */}
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recently Played</h2>
                <Link href="/recent" className="text-sm text-[var(--primary)] hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentMixtapes.map((mixtape) => (
                  <div key={mixtape.id} className="flex items-center gap-3 p-2 hover:bg-[var(--muted)]/50 rounded-lg transition-colors group">
                    <div className="relative h-12 w-12 bg-[var(--muted)] rounded-md overflow-hidden shadow-sm">
                      {/* Placeholder for mixtape cover */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--primary)]">
                          <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{mixtape.title}</h3>
                      <p className="text-xs text-[var(--muted-foreground)]">{mixtape.artist}</p>
                    </div>
                    
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {mixtape.duration}
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Suggested and Library */}
          <div className="space-y-6">
            {/* Suggested artists */}
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Suggested Artists</h2>
                <Link href="/discover" className="text-sm text-[var(--primary)] hover:underline">
                  View More
                </Link>
              </div>
              
              <div className="space-y-4">
                {suggestedArtists.map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-[var(--muted)] rounded-full overflow-hidden">
                        {/* Artist image placeholder */}
                        <div className="h-full w-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{artist.name}</h3>
                        <p className="text-xs text-[var(--muted-foreground)]">{artist.followers} followers</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleFollow(artist.id)}
                      className={`px-3 py-1 text-xs rounded-full ${
                        followingStatus[artist.id]
                          ? 'bg-[var(--primary)] text-white'
                          : 'border border-[var(--primary)] text-[var(--primary)]'
                      }`}
                    >
                      {followingStatus[artist.id] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Shortcuts */}
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Shortcuts</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/favorites" className="flex flex-col items-center justify-center p-4 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-[var(--primary)]">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                  <span className="text-sm">Favorites</span>
                </Link>
                <Link href="/playlists" className="flex flex-col items-center justify-center p-4 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-[var(--primary)]">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span className="text-sm">Playlists</span>
                </Link>
                <Link href="/downloads" className="flex flex-col items-center justify-center p-4 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-[var(--primary)]">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="text-sm">Downloads</span>
                </Link>
                <Link href="/history" className="flex flex-col items-center justify-center p-4 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-[var(--primary)]">
                    <path d="M6 2v6h.01" />
                    <path d="M6 13c3.5 0 7-2 7-7h.01" />
                    <circle cx="15" cy="9" r="1" />
                    <circle cx="16" cy="16" r="1" />
                    <path d="M12 19c-2.2 0-5-1.6-5-5.5" />
                    <path d="M7 13.5C7 14 7.5 18 11 18" />
                    <path d="M17 17c.5 1.5 2 2 4 2" />
                  </svg>
                  <span className="text-sm">History</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Music Library Section */}
        <div className="mt-8">
          <MusicLibrary />
        </div>
      </div>
    </div>
  );
} 