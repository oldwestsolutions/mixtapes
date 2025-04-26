import { Suspense } from 'react';
import ClientSearchPage from '@/components/search/ClientSearchPage';

// Server component that wraps the client-side content
export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <ClientSearchPage />
    </Suspense>
  );
} 