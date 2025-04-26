'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { featuredMixtapes, newReleases, popularMixtapes, trendingMixtapes } from '@/lib/data';
import { Mixtape } from '@/lib/types';

export default function SearchScript() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Get the container where we'll render search results
    const container = document.getElementById('search-results-container');
    if (!container) return;
    
    // Filter mixtapes based on search query
    const filteredMixtapes = [...featuredMixtapes, ...newReleases, ...popularMixtapes, ...trendingMixtapes]
      .filter(mixtape => 
        mixtape.title.toLowerCase().includes(query.toLowerCase()) || 
        mixtape.artist.toLowerCase().includes(query.toLowerCase())
      );
    
    // Create search results HTML
    const content = document.createElement('div');
    
    // Add search results header
    const header = document.createElement('h2');
    header.className = 'text-2xl font-bold mb-6';
    header.textContent = `Search Results for "${query}"`;
    content.appendChild(header);
    
    if (filteredMixtapes.length > 0) {
      // Create grid for results
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5';
      
      // Add each mixtape to the grid
      filteredMixtapes.forEach(mixtape => {
        const card = document.createElement('div');
        card.className = 'mixtape-card';
        card.innerHTML = `
          <a href="/mixtape/${mixtape.id}">
            <div class="relative aspect-square rounded-lg overflow-hidden mb-3 hover:opacity-80 transition-opacity">
              <img 
                src="${mixtape.coverUrl}" 
                alt="${mixtape.title}" 
                class="object-cover w-full h-full"
              />
            </div>
            <h3 class="font-medium text-[var(--foreground)] line-clamp-1">${mixtape.title}</h3>
            <p class="text-sm text-[var(--muted-foreground)] line-clamp-1">${mixtape.artist}</p>
          </a>
        `;
        grid.appendChild(card);
      });
      
      content.appendChild(grid);
    } else {
      // No results message
      const noResults = document.createElement('p');
      noResults.className = 'text-[var(--muted-foreground)]';
      noResults.textContent = `No results found for "${query}"`;
      content.appendChild(noResults);
    }
    
    // Replace loading state with search results
    container.innerHTML = '';
    container.appendChild(content);
    
    setIsInitialized(true);
  }, [query, isInitialized]);
  
  // This component doesn't render anything visible
  return null;
} 