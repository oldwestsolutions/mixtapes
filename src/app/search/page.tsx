import ScriptLoader from './script-loader';
import Layout from '@/components/layout/Layout';

// Static page without client-side code
// This ensures no useSearchParams during build
export default function SearchPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Search</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Find your favorite mixtapes by title or artist
          </p>
        </div>
        
        <div id="search-results-container">
          {/* Client search results will be rendered here */}
          <div className="text-center py-12">
            <div className="inline-block animate-spin mr-2 h-8 w-8 border-4 border-[var(--muted)] border-t-[var(--primary)] rounded-full"></div>
            <p className="mt-4 text-[var(--muted-foreground)]">Loading search results...</p>
          </div>
        </div>
        
        {/* This loads the client-side search script */}
        <ScriptLoader />
      </div>
    </Layout>
  );
} 