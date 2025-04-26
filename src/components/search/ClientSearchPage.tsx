'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; 
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { featuredMixtapes, newReleases, popularMixtapes, trendingMixtapes } from '@/lib/data';
import { Mixtape } from '@/lib/types';

export default function ClientSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Filter mixtapes based on search query
  const filteredMixtapes = [...featuredMixtapes, ...newReleases, ...popularMixtapes, ...trendingMixtapes]
    .filter(mixtape => 
      mixtape.title.toLowerCase().includes(query.toLowerCase()) || 
      mixtape.artist.toLowerCase().includes(query.toLowerCase())
    );
  
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Search</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Find your favorite mixtapes by title or artist
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
          {filteredMixtapes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {filteredMixtapes.map((mixtape) => (
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
                    <h3 className="font-medium text-[var(--foreground)] line-clamp-1">{mixtape.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">{mixtape.artist}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--muted-foreground)]">No results found for "{query}"</p>
          )}
        </div>
      </div>
    </Layout>
  );
} 