export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  audioUrl: string;
}

export interface Mixtape {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  description?: string;
  releaseDate: string; // ISO date string
  tracks: Track[];
} 