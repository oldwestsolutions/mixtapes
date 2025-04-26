'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/placeholder';

interface MixtapeCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  trackCount?: number;
}

export default function MixtapeCard({ id, title, artist, coverUrl, trackCount }: MixtapeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = getImageUrl(coverUrl, id);
  
  return (
    <div 
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--muted)] mb-3 shadow-sm transition-all duration-300 group-hover:shadow-md">
        <Image 
          src={imageUrl} 
          alt={`${title} by ${artist}`} 
          className="object-cover w-full h-full"
          width={300}
          height={300}
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity">
            <button className="h-12 w-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-105 transition-transform transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        )}

        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>
      
      <Link href={`/mixtape/${id}`} className="group-hover:text-[var(--primary)] transition-colors">
        <h3 className="font-medium text-sm mb-1 truncate">{title}</h3>
      </Link>
      <p className="text-xs text-[var(--muted-foreground)] truncate">
        {artist}
        {trackCount && ` • ${trackCount} tracks`}
      </p>
    </div>
  );
} 