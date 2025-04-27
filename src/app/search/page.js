'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { featuredMixtapes, newReleases, popularMixtapes, trendingMixtapes } from '@/lib/data';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState({ mixtapes: [], artists: [], tracks: [] });
  const [activeTab, setActiveTab] = useState('all');

  // Memoize the allMixtapes array to prevent recreation on each render
  const allMixtapes = useMemo(() => [...featuredMixtapes, ...newReleases, ...popularMixtapes, ...trendingMixtapes], []);

  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults({ mixtapes: [], artists: [], tracks: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Search mixtapes
    const mixtapeResults = allMixtapes.filter(mixtape => 
      mixtape.title.toLowerCase().includes(lowerQuery) || 
      mixtape.artist.toLowerCase().includes(lowerQuery)
    );
    
    // Extract unique artists from all mixtapes
    const allArtists = [...new Set(allMixtapes.map(mixtape => mixtape.artist))];
    const artistResults = allArtists.filter(artist => 
      artist.toLowerCase().includes(lowerQuery)
    ).map(name => ({ name, imageUrl: '/placeholder.svg' }));
    
    // Search tracks across all mixtapes
    const trackResults = allMixtapes.flatMap(mixtape => 
      mixtape.tracks.filter(track => 
        track.title.toLowerCase().includes(lowerQuery) || 
        track.artist.toLowerCase().includes(lowerQuery)
      ).map(track => ({
        ...track,
        mixtapeId: mixtape.id,
        mixtapeTitle: mixtape.title,
        mixtapeCover: mixtape.coverUrl
      }))
    );
    
    setResults({
      mixtapes: mixtapeResults,
      artists: artistResults,
      tracks: trackResults
    });
  }, [query, allMixtapes]);

  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Search</h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-6">
            Find your favorite mixtapes, artists, and tracks
          </p>
          
          {/* Search input */}
          <div className="max-w-xl mb-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mixtapes, artists, or tracks..."
                className="w-full h-12 px-4 rounded-lg bg-[#1a1a1a] border border-[var(--border)] outline-none text-white focus:border-[var(--primary)]"
              />
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-[var(--border)] mb-6">
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
              onClick={() => setActiveTab('all')}
            >
              All Results
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'mixtapes' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
              onClick={() => setActiveTab('mixtapes')}
            >
              Mixtapes
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'artists' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
              onClick={() => setActiveTab('artists')}
            >
              Artists
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'tracks' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
              onClick={() => setActiveTab('tracks')}
            >
              Tracks
            </button>
          </div>
          
          {/* Search results */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            {query.trim() ? (
              <>
                {/* Mixtapes section */}
                {(activeTab === 'all' || activeTab === 'mixtapes') && results.mixtapes.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-5">Mixtapes</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                      {results.mixtapes.map((mixtape) => (
                        <div key={mixtape.id} className="mixtape-card">
                          <Link href={`/mixtape/${mixtape.id}`}>
                            <div className="relative aspect-square rounded-lg overflow-hidden mb-3 group-hover:opacity-80 transition-opacity">
                              <Image 
                                src={mixtape.coverUrl} 
                                alt={mixtape.title}
                                className="object-cover w-full h-full"
                                width={300}
                                height={300}
                              />
                            </div>
                            <h3 className="font-medium text-white text-sm line-clamp-1">{mixtape.title}</h3>
                            <p className="text-[var(--muted-foreground)] text-xs line-clamp-1">{mixtape.artist}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Artists section */}
                {(activeTab === 'all' || activeTab === 'artists') && results.artists.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-5">Artists</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                      {results.artists.map((artist, index) => (
                        <div key={index} className="artist-card text-center">
                          <div className="mx-auto relative w-24 h-24 rounded-full overflow-hidden mb-3 bg-[var(--muted)]">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                            </div>
                          </div>
                          <h3 className="font-medium text-white text-sm">{artist.name}</h3>
                          <p className="text-[var(--muted-foreground)] text-xs">Artist</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tracks section */}
                {(activeTab === 'all' || activeTab === 'tracks') && results.tracks.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-5">Tracks</h2>
                    <div className="space-y-2">
                      {results.tracks.map((track) => (
                        <div key={track.id} className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                          <div className="relative h-10 w-10 rounded overflow-hidden mr-4 bg-[var(--muted)]">
                            <Image 
                              src={track.mixtapeCover} 
                              alt={track.mixtapeTitle}
                              className="object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm truncate">{track.title}</h3>
                            <p className="text-[var(--muted-foreground)] text-xs truncate">{track.artist} • {track.mixtapeTitle}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[var(--muted-foreground)]">
                              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                            </span>
                            <button className="h-8 w-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-opacity-90">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* No results state */}
                {((activeTab === 'all' && 
                   results.mixtapes.length === 0 && 
                   results.artists.length === 0 && 
                   results.tracks.length === 0) ||
                  (activeTab === 'mixtapes' && results.mixtapes.length === 0) ||
                  (activeTab === 'artists' && results.artists.length === 0) ||
                  (activeTab === 'tracks' && results.tracks.length === 0)) && (
                  <div className="text-center py-16">
                    <svg className="mx-auto mb-4 w-16 h-16 text-[var(--muted-foreground)]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <h2 className="text-xl font-medium mb-2">No results found</h2>
                    <p className="text-[var(--muted-foreground)]">Try searching for something else</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <svg className="mx-auto mb-4 w-16 h-16 text-[var(--muted-foreground)]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <h2 className="text-xl font-medium mb-2">Search for mixtapes, artists, or tracks</h2>
                <p className="text-[var(--muted-foreground)]">Enter a search term to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 