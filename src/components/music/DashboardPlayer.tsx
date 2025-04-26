'use client';

import { useState, useEffect, useRef } from 'react';

export default function DashboardPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(45);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([]);
  const visualizerRef = useRef<HTMLDivElement>(null);
  
  // Current track info
  const trackInfo = {
    title: "Hip Hop Classics",
    artist: "Urban Legends",
    album: "Golden Era Mixtape Vol. 3",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500",
    duration: "3:42",
    currentTime: "1:46",
  };
  
  // Generate random audio visualizer data
  useEffect(() => {
    // Number of bars in the visualizer
    const barCount = 64;
    
    // Function to generate new random bar heights for the visualizer
    const generateBars = () => {
      const newBars = Array.from({ length: barCount }, () => {
        // Generate a value between 10 and 100
        return isPlaying ? 
          Math.floor(Math.random() * 70) + 30 : 
          Math.floor(Math.random() * 20) + 10;
      });
      return newBars;
    };
    
    // Initial generation
    setVisualizerBars(generateBars());
    
    // Update visualizer while playing
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVisualizerBars(generateBars());
        
        // Update progress too
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Now Playing</h2>
      
      {/* Main player container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Album art */}
        <div className="md:w-1/3">
          <div className="aspect-square bg-[var(--muted)] rounded-lg overflow-hidden shadow-md">
            <img 
              src={trackInfo.coverUrl} 
              alt={trackInfo.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Track info and controls */}
        <div className="md:w-2/3 flex flex-col">
          {/* Track info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold">{trackInfo.title}</h3>
            <p className="text-[var(--muted-foreground)]">{trackInfo.artist}</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{trackInfo.album}</p>
          </div>
          
          {/* Visualizer */}
          <div 
            ref={visualizerRef}
            className="h-20 bg-[var(--muted)]/30 rounded-md mb-4 overflow-hidden flex items-end gap-[1px] p-2"
          >
            {visualizerBars.map((height, index) => (
              <div 
                key={index}
                className="flex-1 bg-[var(--primary)] transition-all duration-75 ease-in-out"
                style={{ 
                  height: `${height}%`,
                  opacity: height / 100 * 0.7 + 0.3, // Higher bars are more opaque
                }}
              />
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="mb-4 space-y-2">
            <div className="relative h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--primary)] rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute h-4 w-4 bg-[var(--primary)] rounded-full top-1/2 transform -translate-y-1/2 -ml-2 cursor-pointer"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
              <span>{trackInfo.currentTime}</span>
              <span>{trackInfo.duration}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center">
            {/* Left controls */}
            <div className="flex items-center gap-3">
              <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M17 14V4" />
                  <path d="M11 4 7 8l4 4" />
                  <path d="M7 8h10" />
                </svg>
              </button>
              
              <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="19 20 9 12 19 4 19 20" />
                  <line x1="5" y1="19" x2="5" y2="5" />
                </svg>
              </button>
              
              <button 
                className="h-12 w-12 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
              
              <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
              </button>
              
              <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4v16" />
                  <path d="M6 8h12l-8 5h8" />
                  <path d="M18 16V4" />
                </svg>
              </button>
            </div>
            
            {/* Right controls */}
            <div className="flex items-center gap-4">
              <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  </svg>
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-20"
                />
                <button className="text-[var(--foreground)] hover:text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 