import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

// Genre categories with images
const genres = [
  { 
    name: 'Hip Hop', 
    image: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?q=80&w=1000',
    href: '/genre/hip-hop'
  },
  { 
    name: 'Electronic', 
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000',
    href: '/genre/electronic'
  },
  { 
    name: 'Jazz', 
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
    href: '/genre/jazz'
  },
  { 
    name: 'Rock', 
    image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=1000',
    href: '/genre/rock'
  },
  { 
    name: 'R&B', 
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1000',
    href: '/genre/rnb'
  },
  { 
    name: 'Classical', 
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1000',
    href: '/genre/classical'
  }
];

// Mood categories
const moods = [
  { name: 'Chill', color: '#8757FF', href: '/mood/chill' },
  { name: 'Workout', color: '#19C2D8', href: '/mood/workout' },
  { name: 'Focus', color: '#FFBC42', href: '/mood/focus' },
  { name: 'Party', color: '#FA2C5B', href: '/mood/party' },
  { name: 'Relax', color: '#73D2DE', href: '/mood/relax' },
  { name: 'Energy', color: '#216583', href: '/mood/energy' },
  { name: 'Sleep', color: '#AA4465', href: '/mood/sleep' },
  { name: 'Motivation', color: '#A2AD59', href: '/mood/motivation' }
];

export default function BrowsePage() {
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Browse</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Explore mixtapes by genre, mood, or activity
          </p>
        </div>
        
        {/* Genres */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {genres.map((genre) => (
              <Link 
                key={genre.name} 
                href={genre.href}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image 
                  src={genre.image} 
                  alt={genre.name}
                  fill
                  className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Moods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Moods & Activities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {moods.map((mood) => (
              <Link 
                key={mood.name} 
                href={mood.href}
                className="p-6 rounded-xl text-white group transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: mood.color }}
              >
                <h3 className="text-xl font-bold mb-2">{mood.name}</h3>
                <p className="text-sm opacity-80">Mixtapes for every {mood.name.toLowerCase()} moment</p>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Editor's Picks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Editor's Picks</h2>
          <div className="bg-gradient-to-r from-[var(--primary)] to-[#8757FF] rounded-xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-3">Summer Essentials</h3>
            <p className="text-lg mb-6 opacity-80">The perfect mixtapes to soundtrack your summer adventures</p>
            <Link 
              href="/editorial/summer-essentials"
              className="inline-block bg-white text-[var(--primary)] px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
} 