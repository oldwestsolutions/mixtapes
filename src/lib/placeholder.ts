/**
 * These functions handle placeholder images until real images are available
 */

// Colors for placeholder mixtape covers
const colors = [
  '#FA2C5B', // Primary color
  '#8757FF',
  '#19C2D8',
  '#FFBC42',
  '#AA4465',
  '#216583',
  '#73D2DE',
  '#A2AD59'
];

/**
 * Generates a consistent color based on a string (mixtape id)
 */
export function getColorForMixtape(id: string): string {
  // Simple hash function to get consistent colors
  const hash = id.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Returns the real image URL or generates a placeholder URL
 */
export function getImageUrl(imageUrl: string, id: string): string {
  // If it's a real URL that starts with http or https, return it
  if (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'))) {
    return imageUrl;
  }
  
  // For local testing, use a placeholder
  return `https://placehold.co/600x600/${getColorForMixtape(id).replace('#', '')}/${
    id.charCodeAt(0) % 2 === 0 ? 'ffffff' : '000000'
  }?text=${encodeURIComponent(`Mixtape ${id}`)}`;
} 