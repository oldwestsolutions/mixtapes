'use client';

import { useState, useEffect } from 'react';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);
  const [currentTime, setCurrentTime] = useState('1:15');
  const [totalTime, setTotalTime] = useState('3:45');
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for current track
  const currentTrack = {
    title: "Summer Vibes",
    artist: "DJ Sunshine",
    coverArt: "https://images.unsplash.com/photo-1534131707746-25d604851a1f?q=80&w=1000",
  };

  // Update progress as if the song is playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] z-30">
      {/* Smaller player (always visible) */}
      <div className="container mx-auto">
        <div className="flex items-center h-16 px-2 md:px-4">
          {/* Track info */}
          <div className="flex items-center min-w-0 flex-1">
            <div className="h-10 w-10 bg-[var(--muted)] rounded-md overflow-hidden shadow-sm mr-3">
              <img 
                src={currentTrack.coverArt} 
                alt={currentTrack.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <h3 className="font-medium text-sm truncate">{currentTrack.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] truncate">{currentTrack.artist}</p>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex items-center space-x-4">
            <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" y1="19" x2="5" y2="5" />
              </svg>
            </button>
            
            <button 
              className="h-10 w-10 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            
            <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="5" x2="19" y2="19" />
              </svg>
            </button>
          </div>
          
          {/* Volume and expand controls */}
          <div className="hidden md:flex items-center ml-4 space-x-4">
            <div className="flex items-center">
              <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-20 ml-2"
              />
            </div>
            
            <button 
              className="text-[var(--foreground)] hover:text-[var(--primary)]"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="relative h-1 bg-[var(--muted)]">
          <div 
            className="h-full bg-[var(--primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Expanded player */}
      {isExpanded && (
        <div className="fixed inset-0 z-40 bg-[var(--background)] pt-[var(--header-height)] overflow-auto">
          <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            {/* Album art and track info */}
            <div className="lg:w-1/2">
              <div className="aspect-square bg-[var(--muted)] rounded-lg overflow-hidden shadow-md mb-4 max-w-md mx-auto">
                <img 
                  src={currentTrack.coverArt} 
                  alt={currentTrack.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center max-w-md mx-auto">
                <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
                <p className="text-[var(--muted-foreground)]">{currentTrack.artist}</p>
              </div>
            </div>
            
            {/* Player controls and queue */}
            <div className="lg:w-1/2 space-y-8">
              {/* Timeline scrubber */}
              <div className="space-y-2">
                <div className="relative h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--primary)] rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
                  <span>{currentTime}</span>
                  <span>{totalTime}</span>
                </div>
              </div>
              
              {/* Main controls */}
              <div className="flex justify-center items-center space-x-6">
                <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M17 14V4" />
                    <path d="M11 4 7 8l4 4" />
                    <path d="M7 8h10" />
                  </svg>
                </button>
                
                <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="19 20 9 12 19 4 19 20" />
                    <line x1="5" y1="19" x2="5" y2="5" />
                  </svg>
                </button>
                
                <button 
                  className="h-16 w-16 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
                
                <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line x1="19" y1="5" x2="19" y2="19" />
                  </svg>
                </button>
                
                <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </button>
              </div>
              
              {/* Close expanded view button */}
              <div className="text-center">
                <button 
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] inline-flex items-center gap-2"
                  onClick={() => setIsExpanded(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  <span>Close Player</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 