'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import MixtapeCard from '@/components/mixtapes/MixtapeCard';
import { featuredMixtapes, newReleases, popularMixtapes } from '@/lib/data';
import { Mixtape } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Mixtape[]>([]);
  const [searchInput, setSearchInput] = useState(query);
  
  useEffect(() => {
    // Set the input field to match URL query
    setSearchInput(query);
    
    // If no query, don't search
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    // Combine all mixtapes and filter by the search query
    const allMixtapes = [...featuredMixtapes, ...newReleases, ...popularMixtapes];
    const results = allMixtapes.filter(mixtape => {
      const lowerQuery = query.toLowerCase();
      return (
        mixtape.title.toLowerCase().includes(lowerQuery) ||
        mixtape.artist.toLowerCase().includes(lowerQuery) ||
        mixtape.tracks.some(track => 
          track.title.toLowerCase().includes(lowerQuery) ||
          track.artist.toLowerCase().includes(lowerQuery)
        )
      );
    });
    
    setSearchResults(results);
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput);
    window.history.pushState({}, '', url.toString());
    
    // Manually trigger the effect
    const allMixtapes = [...featuredMixtapes, ...newReleases, ...popularMixtapes];
    const results = allMixtapes.filter(mixtape => {
      const lowerQuery = searchInput.toLowerCase();
      return (
        mixtape.title.toLowerCase().includes(lowerQuery) ||
        mixtape.artist.toLowerCase().includes(lowerQuery) ||
        mixtape.tracks.some(track => 
          track.title.toLowerCase().includes(lowerQuery) ||
          track.artist.toLowerCase().includes(lowerQuery)
        )
      );
    });
    
    setSearchResults(results);
  };
  
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Mixtapes</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search mixtapes, artists, or tracks..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-md bg-[var(--muted)] border border-transparent focus:border-[var(--primary)] outline-none transition-colors"
              />
            </div>
            <button 
              type="submit"
              className="h-12 px-6 rounded-md bg-[var(--primary)] text-white font-medium"
            >
              Search
            </button>
          </div>
        </form>
        
        {query && (
          <div className="mb-4">
            <p className="text-[var(--muted-foreground)]">
              {searchResults.length === 0
                ? `No results found for "${query}"`
                : `${searchResults.length} results for "${query}"`}
            </p>
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {searchResults.map((mixtape) => (
              <MixtapeCard
                key={mixtape.id}
                id={mixtape.id}
                title={mixtape.title}
                artist={mixtape.artist}
                coverUrl={mixtape.coverUrl}
                trackCount={mixtape.tracks.length}
              />
            ))}
          </div>
        )}
        
        {!query && (
          <div className="text-center py-12">
            <div className="text-[var(--muted-foreground)] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Search for mixtapes</h2>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
              Find mixtapes by title, artist name, or track title.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Search Mixtapes</h1>
            <div className="flex items-center justify-center py-20">
              <div className="animate-pulse text-[var(--muted-foreground)]">Loading search...</div>
            </div>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </Layout>
  );
} 