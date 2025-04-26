// Static page with no client-side functionality
export default function SearchPage() {
  return (
    <div className="pt-[calc(var(--header-height)+1rem)] pb-20">
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
            <div className="absolute right-3 top-3 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Static Album Grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Popular Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4" style={{background: '#1a1a1a', padding: '2rem', borderRadius: '0.5rem'}}>
            {/* Hardcoded album cards */}
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="mixtape-card">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.95 1.65a.75.75 0 0 1 .3.6v14.7a3 3 0 0 1-2.18 2.88l-1.32.38a2.55 2.55 0 1 1-1.4-4.91l2.31-.66a1.5 1.5 0 0 0 1.09-1.44V7l-9 2.57v9.74a3 3 0 0 1-2.18 2.88l-1.32.38a2.55 2.55 0 1 1-1.4-4.91l2.31-.66A1.5 1.5 0 0 0 8.5 15.5V5.25a.75.75 0 0 1 .54-.72l10.5-3a.75.75 0 0 1 .66.12Z" fill="#9333ea" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-white text-sm truncate">Album {index + 1}</h3>
                <p className="text-gray-400 text-xs truncate">Artist Name</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 