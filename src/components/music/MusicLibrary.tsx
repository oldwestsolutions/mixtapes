'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock library data
const libraryMixtapes = [
  {
    id: '101',
    title: 'Late Night Jazz',
    artist: 'Smooth Jazz Trio',
    coverUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=500',
    addedDate: '2023-12-15',
    genre: 'Jazz',
  },
  {
    id: '102',
    title: 'Morning Acoustic',
    artist: 'Indie Folk Band',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=500',
    addedDate: '2024-01-10',
    genre: 'Folk',
  },
  {
    id: '103',
    title: 'Hip Hop Essentials',
    artist: 'Urban Collective',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500',
    addedDate: '2024-02-05',
    genre: 'Hip Hop',
  },
  {
    id: '104',
    title: 'Electronic Beats',
    artist: 'Future Sound',
    coverUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=500',
    addedDate: '2024-03-20',
    genre: 'Electronic',
  },
  {
    id: '105',
    title: 'Rock Classics',
    artist: 'Guitar Heroes',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=500',
    addedDate: '2024-01-25',
    genre: 'Rock',
  },
  {
    id: '106',
    title: 'Chill Lo-Fi',
    artist: 'Beats Producer',
    coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    addedDate: '2024-03-05',
    genre: 'Lo-Fi',
  },
  {
    id: '107',
    title: 'Soul & R&B',
    artist: 'Rhythm Collective',
    coverUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=500',
    addedDate: '2024-02-18',
    genre: 'R&B',
  },
  {
    id: '108',
    title: 'Classical Piano',
    artist: 'Piano Virtuoso',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=500',
    addedDate: '2024-01-30',
    genre: 'Classical',
  },
];

// Filter types for the library
const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'recent', label: 'Recently Added' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'genre', label: 'By Genre' },
];

// Genre list for filtering
const genres = Array.from(new Set(libraryMixtapes.map(item => item.genre)));

export default function MusicLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredLibrary, setFilteredLibrary] = useState(libraryMixtapes);

  // Apply filtering and searching
  useEffect(() => {
    let result = [...libraryMixtapes];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply library filters
    switch (activeFilter) {
      case 'recent':
        result.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'genre':
        if (selectedGenre) {
          result = result.filter(item => item.genre === selectedGenre);
        }
        break;
      default:
        // Default sort (by id or however they come)
        break;
    }
    
    setFilteredLibrary(result);
  }, [searchTerm, activeFilter, selectedGenre]);

  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Your Music Library</h2>
      
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your library..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 px-4 pr-10 rounded-lg bg-[var(--muted)]/70 border border-[var(--border)] outline-none transition-all text-sm focus:bg-[var(--background)] focus:ring-2 focus:ring-[var(--primary)]/30"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute right-3 top-3 text-[var(--muted-foreground)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Filter options */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setActiveFilter(filter.value);
                if (filter.value === 'genre') {
                  setShowGenres(!showGenres);
                } else {
                  setShowGenres(false);
                }
              }}
              className={`px-3 py-2 text-sm rounded-md whitespace-nowrap ${
                activeFilter === filter.value
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)]/70 hover:bg-[var(--muted)] text-[var(--foreground)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Genre selector (visible when genre filter is active) */}
      {showGenres && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2 text-[var(--muted-foreground)]">Select Genre</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre('')}
              className={`px-3 py-1 text-xs rounded-full ${
                selectedGenre === ''
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)] text-[var(--foreground)]'
              }`}
            >
              All Genres
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 text-xs rounded-full ${
                  selectedGenre === genre
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)] text-[var(--foreground)]'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Library content - Grid view */}
      {filteredLibrary.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredLibrary.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-square bg-[var(--muted)] rounded-md overflow-hidden shadow-sm mb-2 group-hover:shadow-md transition-shadow">
                <img 
                  src={item.coverUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="h-12 w-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm truncate">{item.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{item.artist}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[var(--muted-foreground)]">No mixtapes found matching your search.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
              setSelectedGenre('');
            }}
            className="mt-2 text-[var(--primary)] text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
} 