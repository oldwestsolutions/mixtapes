import Link from 'next/link';
import MixtapeCard from './MixtapeCard';
import { Mixtape } from '@/lib/types';

interface MixtapeSectionProps {
  title: string;
  mixtapes: Mixtape[];
  seeAllHref?: string;
}

export default function MixtapeSection({ title, mixtapes, seeAllHref }: MixtapeSectionProps) {
  // Special grid layout for Top 10 section
  const gridClass = title === "Top 10" 
    ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4"
    : "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4";

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {seeAllHref && (
          <Link 
            href={seeAllHref} 
            className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            See All
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        )}
      </div>
      
      <div className={gridClass}>
        {mixtapes.map((mixtape) => (
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
    </section>
  );
} 