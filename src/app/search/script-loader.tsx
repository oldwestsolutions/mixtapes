'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the search script
const SearchScript = dynamic(() => import('@/components/search/SearchScript'), {
  ssr: false, // Don't try to render during SSR
});

export default function ScriptLoader() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only render on client side
  if (!isClient) return null;
  
  return <SearchScript />;
} 