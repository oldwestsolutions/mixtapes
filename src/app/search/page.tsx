import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { featuredMixtapes, newReleases, popularMixtapes } from '@/lib/data';

// Simple static search page with no client-side functionality
export default function SearchPage() {
  // Combine all mixtapes for display
  const allMixtapes = [...featuredMixtapes, ...newReleases, ...popularMixtapes].slice(0, 32);
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Search</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Find your favorite mixtapes by title or artist
          </p>
        </div>
        
        {/* Search input (static, non-functional) */}
        <div className="mb-8 max-w-xl">
          <div className="relative">
            <input
              type="text"
              readOnly
              placeholder="Search mixtapes..."
              className="w-full h-12 px-4 pr-10 rounded-lg bg-[#1a1a1a] border border-[var(--border)] outline-none text-white"
            />
            <div className="absolute right-3 top-3 text-[var(--muted-foreground)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Popular mixtapes section (static) */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Popular Mixtapes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4" style={{background: '#1a1a1a', padding: '2rem', borderRadius: '0.5rem'}}>
            {allMixtapes.map((mixtape) => (
              <div key={mixtape.id} className="mixtape-card">
                <Link href={`/mixtape/${mixtape.id}`}>
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3 group-hover:opacity-80 transition-opacity">
                    <img 
                      src={mixtape.coverUrl} 
                      alt={mixtape.title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-medium text-white text-sm line-clamp-1">{mixtape.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-xs line-clamp-1">{mixtape.artist}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 