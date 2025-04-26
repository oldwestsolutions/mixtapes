import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { getMixtapeById } from '@/lib/data';
import TrackList from '@/components/mixtapes/TrackList';
import { notFound } from 'next/navigation';
import { getImageUrl } from '@/lib/placeholder';

export default function MixtapeDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const mixtape = getMixtapeById(params.id);
  
  if (!mixtape) {
    notFound();
  }
  
  const imageUrl = getImageUrl(mixtape.coverUrl, mixtape.id);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="relative aspect-square rounded-md overflow-hidden bg-[var(--muted)]">
              <Image 
                src={imageUrl} 
                alt={`${mixtape.title} by ${mixtape.artist}`} 
                className="object-cover"
                width={400}
                height={400}
                priority
              />
            </div>
            
            <div className="mt-4 flex flex-col gap-1">
              <button className="w-full h-10 rounded-md bg-[var(--primary)] text-white font-medium flex items-center justify-center gap-2 hover:bg-opacity-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play
              </button>
              
              <button className="w-full h-10 rounded-md border border-[var(--border)] bg-transparent font-medium flex items-center justify-center gap-2 hover:bg-[var(--muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                Add to Library
              </button>
            </div>
            
            <div className="mt-6 text-sm">
              <p className="text-[var(--muted-foreground)] mb-1">Released: {formatDate(mixtape.releaseDate)}</p>
              <p className="text-[var(--muted-foreground)]">{mixtape.tracks.length} tracks</p>
            </div>
          </div>
          
          <div className="flex-1">
            <div>
              <h1 className="text-3xl font-bold mb-2">{mixtape.title}</h1>
              <p className="text-xl text-[var(--muted-foreground)] mb-4">{mixtape.artist}</p>
              {mixtape.description && (
                <p className="text-[var(--muted-foreground)] mb-6">{mixtape.description}</p>
              )}
            </div>
            
            <TrackList tracks={mixtape.tracks} />
          </div>
        </div>
      </div>
    </Layout>
  );
} 