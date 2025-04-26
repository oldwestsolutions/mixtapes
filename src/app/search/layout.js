import { Suspense } from 'react';

export default function SearchLayout({ children }) {
  return (
    <Suspense fallback={
      <div className="pt-[calc(var(--header-height)+1rem)] pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="inline-block animate-spin mr-2 h-8 w-8 border-4 border-[var(--muted)] border-t-[var(--primary)] rounded-full"></div>
            <p className="mt-4 text-[var(--muted-foreground)]">Loading search results...</p>
          </div>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
} 