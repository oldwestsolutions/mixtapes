import { NextResponse } from 'next/server';

export function GET(request: Request) {
  // Just return a response that allows the client component to handle the search
  return NextResponse.json({ message: 'Use client-side search functionality' });
} 