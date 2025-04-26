import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

// Radio stations
const featuredStations = [
  {
    id: 'mixtapes-one',
    name: 'Mixtapes One',
    description: 'Non-stop hits from the biggest artists.',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000',
    color: '#fa2c5b',
    liveNow: true,
    currentShow: 'Morning Mix with DJ Max',
    listeners: 2348
  },
  {
    id: 'hip-hop-radio',
    name: 'Hip Hop Radio',
    description: 'The freshest beats and rhymes 24/7.',
    coverImage: 'https://images.unsplash.com/photo-1571609601230-78254d651fb7?q=80&w=1000',
    color: '#8757FF',
    liveNow: true,
    currentShow: 'Street Beats with MC Flow',
    listeners: 1875
  },
  {
    id: 'chill-wave',
    name: 'Chill Wave',
    description: 'Relaxing beats to unwind and focus.',
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000',
    color: '#19C2D8',
    liveNow: false,
    currentShow: 'Returns at 8PM with Ambient Sessions',
    listeners: 0
  }
];

// Featured DJs
const featuredDJs = [
  {
    id: 'dj-max',
    name: 'DJ Max',
    specialty: 'House & EDM',
    image: 'https://images.unsplash.com/photo-1534131707746-25d604851a1f?q=80&w=500',
    followers: '345K'
  },
  {
    id: 'mc-flow',
    name: 'MC Flow',
    specialty: 'Hip Hop & Trap',
    image: 'https://images.unsplash.com/photo-1604513843812-ded1d3f8f2ed?q=80&w=500',
    followers: '287K'
  },
  {
    id: 'dj-luna',
    name: 'DJ Luna',
    specialty: 'Lo-fi & Ambient',
    image: 'https://images.unsplash.com/photo-1595246007497-68786be94f0c?q=80&w=500',
    followers: '192K'
  },
  {
    id: 'beat-master',
    name: 'Beat Master',
    specialty: 'Drum & Bass',
    image: 'https://images.unsplash.com/photo-1623188314687-70e964e5e2bd?q=80&w=500',
    followers: '156K'
  }
];

// Music categories for radio
const categories = [
  { name: 'Hip Hop', href: '/radio/genre/hip-hop', image: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?q=80&w=1000' },
  { name: 'Electronic', href: '/radio/genre/electronic', image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000' },
  { name: 'Jazz', href: '/radio/genre/jazz', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000' },
  { name: 'Chill', href: '/radio/mood/chill', image: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=1000' },
  { name: 'Workout', href: '/radio/mood/workout', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000' },
  { name: 'Study', href: '/radio/mood/study', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000' }
];

export default function RadioPage() {
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Radio</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Listen to live radio stations and shows hosted by world-class DJs
          </p>
        </div>
        
        {/* Live Stations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Stations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStations.map((station) => (
              <div 
                key={station.id} 
                className="bg-[var(--secondary)] rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md"
              >
                <div 
                  className="h-48 relative" 
                  style={{ background: `linear-gradient(to bottom right, ${station.color}, ${station.color}90)` }}
                >
                  <Image 
                    src={station.coverImage} 
                    alt={station.name}
                    fill
                    className="object-cover opacity-60 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center">
                      {station.liveNow && (
                        <span className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="h-2 w-2 bg-white rounded-full inline-block animate-pulse"></span>
                          LIVE
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-1">{station.name}</h3>
                      <p className="text-white text-sm opacity-90">{station.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">
                      {station.liveNow ? 'NOW PLAYING' : 'OFFLINE'}
                    </p>
                    <p className="text-sm font-medium truncate">{station.currentShow}</p>
                  </div>
                  {station.liveNow ? (
                    <button className="h-10 w-10 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:scale-105 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  ) : (
                    <button className="text-xs px-3 py-1 border border-[var(--border)] rounded-full hover:bg-[var(--muted)]">
                      Set Reminder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Featured DJs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured DJs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredDJs.map((dj) => (
              <Link 
                key={dj.id} 
                href={`/radio/dj/${dj.id}`}
                className="group"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-[var(--muted)]">
                  <Image 
                    src={dj.image} 
                    alt={dj.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-lg font-bold">{dj.name}</h3>
                    <p className="text-white text-xs opacity-90">{dj.followers} followers</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">{dj.specialty}</p>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image 
                  src={category.image} 
                  alt={category.name}
                  fill
                  className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <h3 className="text-white text-lg font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Shows Schedule */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Coming Up Today</h2>
          <div className="bg-[var(--secondary)] rounded-xl p-5">
            <div className="grid grid-cols-1 divide-y divide-[var(--border)]">
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <span className="text-sm font-bold">8:00 PM</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Ambient Sessions</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Chill Wave • DJ Luna</p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1 border border-[var(--border)] rounded-full hover:bg-[var(--muted)]">
                  Set Reminder
                </button>
              </div>
              
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <span className="text-sm font-bold">9:30 PM</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Late Night Beats</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Hip Hop Radio • MC Flow</p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1 border border-[var(--border)] rounded-full hover:bg-[var(--muted)]">
                  Set Reminder
                </button>
              </div>
              
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <span className="text-sm font-bold">11:00 PM</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Midnight Mix</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Mixtapes One • DJ Max</p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1 border border-[var(--border)] rounded-full hover:bg-[var(--muted)]">
                  Set Reminder
                </button>
              </div>
            </div>
            
            <Link 
              href="/radio/schedule"
              className="w-full mt-4 block text-center text-sm text-[var(--primary)] font-medium py-2 hover:underline"
            >
              View Full Schedule
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
} 