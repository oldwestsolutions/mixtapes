import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // This is mainly to ensure the page itself renders correctly
  // The actual search functionality is implemented client-side
  // in ClientSearchPage.tsx

  // Get search parameter if needed by API consumers
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  return NextResponse.json({ 
    message: 'Search API endpoint is working',
    query,
    info: 'Primary search functionality is implemented client-side' 
  });
} 