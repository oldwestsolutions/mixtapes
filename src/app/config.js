// Global configuration for Next.js App Router
export const dynamic = 'force-dynamic'; // All pages default to dynamic rendering
export const dynamicParams = true; // All dynamic routes are dynamic
export const revalidate = 0; // Never cache data
export const fetchCache = 'force-no-store'; // Never use fetch cache 