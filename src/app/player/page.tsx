'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function IpodPlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get track info from URL params (in a real app, we'd use a more robust state management)
  const title = searchParams.get('title') || 'No Mixtape Selected';
  const artist = searchParams.get('artist') || 'Unknown Artist';
  const coverUrl = searchParams.get('cover') || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000';
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);
  const [currentTime, setCurrentTime] = useState('1:15');
  const [totalTime, setTotalTime] = useState('3:45');

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

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] overflow-hidden">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-[var(--foreground)] hover:text-[var(--primary)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="ml-2">Back</span>
        </button>
        <h1 className="text-lg font-medium">Now Playing</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* iPod-style circular interface */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-4">
        {/* Album artwork */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg overflow-hidden shadow-lg mb-8 bg-[var(--muted)]">
          <img 
            src={coverUrl} 
            alt={`${title} by ${artist}`} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-[var(--muted-foreground)] text-lg">{artist}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mb-4">
          <div className="relative h-2 bg-[var(--muted)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--primary)] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-[var(--muted-foreground)] mt-1">
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>

        {/* iPod-style wheel controls */}
        <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-[var(--card)] shadow-md mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--background)] flex items-center justify-center cursor-pointer"
                onClick={togglePlayback}>
              <span className="text-lg font-medium">MENU</span>
            </div>
          </div>
          
          {/* Wheel navigation buttons */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6-6 6 6" />
            </svg>
          </div>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 15 6 6 6-6" />
            </svg>
          </div>
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePlayback}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isPlaying ? (
                <>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </>
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" />
              )}
            </svg>
          </div>
        </div>

        <div className="flex space-x-4">
          <button 
            className="p-3 rounded-full bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 12H3" />
              <path d="m16 7 5 5-5 5" />
            </svg>
          </button>
          <button 
            className="p-3 rounded-full bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M17 14V4" />
              <path d="M11 4 7 8l4 4" />
              <path d="M7 8h10" />
            </svg>
          </button>
          <button 
            className="p-3 rounded-full bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20v-6m0 0V4m0 10h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 