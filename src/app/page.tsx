'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MixtapeSection from '@/components/mixtapes/MixtapeSection';
import { featuredMixtapes, newReleases, popularMixtapes, trendingMixtapes } from '@/lib/data';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMixtape, setSelectedMixtape] = useState<any>(null);

  const handleMixtapeClick = (mixtape: any) => {
    setSelectedMixtape(mixtape);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAdCompleted = () => {
    // This would eventually redirect to the player or play the song
    alert('Ad completed! Now playing: ' + selectedMixtape.title);
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        {/* Top sections side by side on all screen sizes */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-3">
            {/* Featured section - single column on mobile, 2x2 grid on larger screens */}
            <div className="flex flex-col h-full">
              <div className="mb-2 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Featured</h2>
              </div>
              <div className="bg-[var(--card)] rounded-lg overflow-hidden flex-1 p-3 flex flex-col justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 h-full">
                  {featuredMixtapes.slice(0, 4).map((mixtape, index) => (
                    <div 
                      key={mixtape.id} 
                      className="bg-[var(--card)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:translate-y-[-4px] cursor-pointer"
                      onClick={() => handleMixtapeClick(mixtape)}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img src={mixtape.coverUrl} alt={mixtape.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate">{mixtape.title}</h3>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">{mixtape.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Top 10 section - showing all 10 mixtapes in a 2-column layout with vertical cards */}
            <div className="flex flex-col h-full">
              <div className="mb-2 sm:mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Top 10</h2>
              </div>
              <div className="bg-[var(--card)] rounded-lg overflow-hidden flex-1 p-2">
                <div className="grid grid-cols-2 gap-2 h-full">
                  {trendingMixtapes.slice(0, 10).map((mixtape, index) => (
                    <div 
                      key={mixtape.id} 
                      className="flex flex-col transition-all duration-300 hover:bg-[var(--muted)] rounded-md p-1 cursor-pointer"
                      onClick={() => handleMixtapeClick(mixtape)}
                    >
                      <div className="relative mb-1">
                        <div className="rounded overflow-hidden aspect-square w-full max-w-[90px] mx-auto">
                          <img src={mixtape.coverUrl} alt={mixtape.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      </div>
                      <div className="overflow-hidden text-center">
                        <h3 className="font-medium text-[10px] md:text-xs truncate">{mixtape.title}</h3>
                        <p className="text-[8px] md:text-[10px] text-[var(--muted-foreground)] truncate">{mixtape.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MixtapeSection
          title="New Releases"
          mixtapes={newReleases.slice(0, 16)}
        />
        
        <MixtapeSection 
          title="Popular Mixtapes" 
          mixtapes={popularMixtapes.slice(0, 16)} 
        />
      </div>

      {/* Ad Modal */}
      {showModal && selectedMixtape && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] rounded-lg max-w-md w-full overflow-hidden shadow-xl">
            {/* Ad header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h3 className="font-bold text-lg">Advertisement</h3>
              <button 
                onClick={closeModal}
                className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-[var(--muted)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Ad content */}
            <div className="p-4">
              <div className="aspect-video bg-[var(--muted)] rounded-md mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎵</div>
                  <p className="font-medium">Ad Placeholder</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Your ad would play here</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded overflow-hidden">
                  <img src={selectedMixtape.coverUrl} alt={selectedMixtape.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedMixtape.title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{selectedMixtape.artist}</p>
                </div>
              </div>
              
              <div className="text-sm text-[var(--muted-foreground)] mb-4">
                Watch this ad to unlock this mixtape.
              </div>
            </div>
            
            {/* Ad footer */}
            <div className="p-4 border-t border-[var(--border)] flex justify-end">
              <button 
                onClick={handleAdCompleted}
                className="bg-[var(--primary)] text-white py-2 px-4 rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Skip Ad (5s)
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
