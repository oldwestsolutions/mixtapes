'use client';

import { useState } from 'react';
import { Track } from '@/lib/types';

interface TrackListProps {
  tracks: Track[];
  onTrackPlay?: (track: Track) => void;
}

export default function TrackList({ tracks, onTrackPlay }: TrackListProps) {
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="mt-6">
      <div className="bg-[var(--muted)] rounded-t-md px-4 py-2 text-xs text-[var(--muted-foreground)] grid grid-cols-[40px_1fr_minmax(100px,_200px)_80px] gap-4 items-center">
        <div className="text-center">#</div>
        <div>Title</div>
        <div>Artist</div>
        <div className="text-right">Duration</div>
      </div>
      
      <div className="border border-[var(--border)] rounded-b-md overflow-hidden">
        {tracks.map((track, index) => (
          <div 
            key={track.id}
            className={`grid grid-cols-[40px_1fr_minmax(100px,_200px)_80px] gap-4 items-center px-4 py-3 hover:bg-[var(--muted)] transition-colors ${
              index !== tracks.length - 1 ? 'border-b border-b-[var(--border)]' : ''
            }`}
            onMouseEnter={() => setHoveredTrackId(track.id)}
            onMouseLeave={() => setHoveredTrackId(null)}
          >
            <div className="flex justify-center">
              {hoveredTrackId === track.id ? (
                <button 
                  className="text-[var(--primary)]"
                  onClick={() => onTrackPlay && onTrackPlay(track)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              ) : (
                <span className="text-sm text-[var(--muted-foreground)]">{index + 1}</span>
              )}
            </div>
            
            <div className="truncate font-medium text-sm">{track.title}</div>
            <div className="text-sm text-[var(--muted-foreground)] truncate">{track.artist}</div>
            <div className="text-sm text-[var(--muted-foreground)] text-right">{formatDuration(track.duration)}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 