import { Mixtape } from './types';

export const featuredMixtapes: Mixtape[] = [
  {
    id: '1',
    title: 'Summer Vibes 2024',
    artist: 'DJ Sunshine',
    coverUrl: 'https://images.unsplash.com/photo-1534131707746-25d604851a1f?q=80&w=1000',
    description: 'The perfect mixtape for those sunny beach days and warm summer nights.',
    releaseDate: '2024-06-15',
    tracks: [
      {
        id: '1-1',
        title: 'Sunny Days',
        artist: 'Beach Boys',
        duration: 218,
        audioUrl: '/audio/track1.mp3'
      },
      {
        id: '1-2',
        title: 'Ocean Waves',
        artist: 'Summer Breeze',
        duration: 195,
        audioUrl: '/audio/track2.mp3'
      },
      {
        id: '1-3',
        title: 'Sunset Dreams',
        artist: 'Tropical Vibes',
        duration: 232,
        audioUrl: '/audio/track3.mp3'
      }
    ]
  },
  {
    id: '2',
    title: 'Late Night Beats',
    artist: 'MC Moonlight',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
    description: 'Smooth beats and rhythms for your late night sessions.',
    releaseDate: '2024-05-20',
    tracks: [
      {
        id: '2-1',
        title: 'Midnight Groove',
        artist: 'Urban Soul',
        duration: 245,
        audioUrl: '/audio/track4.mp3'
      },
      {
        id: '2-2',
        title: 'City Lights',
        artist: 'Street Beats',
        duration: 210,
        audioUrl: '/audio/track5.mp3'
      },
      {
        id: '2-3',
        title: 'Dark Alleys',
        artist: 'Night Prowler',
        duration: 228,
        audioUrl: '/audio/track6.mp3'
      }
    ]
  },
  {
    id: '3',
    title: 'Workout Mix',
    artist: 'Fitness Freaks',
    coverUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000',
    description: 'High energy tracks to power your workout sessions.',
    releaseDate: '2024-04-10',
    tracks: [
      {
        id: '3-1',
        title: 'Power Up',
        artist: 'Energy Crew',
        duration: 198,
        audioUrl: '/audio/track7.mp3'
      },
      {
        id: '3-2',
        title: 'Run Faster',
        artist: 'Sprint Kings',
        duration: 185,
        audioUrl: '/audio/track8.mp3'
      },
      {
        id: '3-3',
        title: 'No Pain No Gain',
        artist: 'Gym Heroes',
        duration: 215,
        audioUrl: '/audio/track9.mp3'
      }
    ]
  },
  {
    id: '4',
    title: 'Chill Session',
    artist: 'Relax Masters',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000',
    description: 'Laid back beats for your relaxation and meditation.',
    releaseDate: '2024-03-25',
    tracks: [
      {
        id: '4-1',
        title: 'Calm Mind',
        artist: 'Peace Seekers',
        duration: 250,
        audioUrl: '/audio/track10.mp3'
      },
      {
        id: '4-2',
        title: 'Zen Garden',
        artist: 'Meditation Gurus',
        duration: 265,
        audioUrl: '/audio/track11.mp3'
      },
      {
        id: '4-3',
        title: 'Inner Peace',
        artist: 'Soul Healers',
        duration: 282,
        audioUrl: '/audio/track12.mp3'
      }
    ]
  },
  {
    id: '9',
    title: 'Indie Classics',
    artist: 'Indie Collective',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000',
    description: 'A collection of indie hits that defined a generation.',
    releaseDate: '2024-02-28',
    tracks: [
      {
        id: '9-1',
        title: 'Vinyl Dreams',
        artist: 'The Alternatives',
        duration: 224,
        audioUrl: '/audio/track21.mp3'
      },
      {
        id: '9-2',
        title: 'Acoustic Journey',
        artist: 'Folk Heroes',
        duration: 196,
        audioUrl: '/audio/track22.mp3'
      },
      {
        id: '9-3',
        title: 'Coffee Shop',
        artist: 'Urban Poets',
        duration: 243,
        audioUrl: '/audio/track23.mp3'
      }
    ]
  },
  {
    id: '10',
    title: 'Electronic Dreams',
    artist: 'Circuit Benders',
    coverUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000',
    description: 'Futuristic electronic sounds to transport you to another dimension.',
    releaseDate: '2024-01-05',
    tracks: [
      {
        id: '10-1',
        title: 'Neural Network',
        artist: 'Digital Minds',
        duration: 320,
        audioUrl: '/audio/track24.mp3'
      },
      {
        id: '10-2',
        title: 'Silicon Valley',
        artist: 'Code Breakers',
        duration: 267,
        audioUrl: '/audio/track25.mp3'
      },
      {
        id: '10-3',
        title: 'Electric Dreams',
        artist: 'Cyber Punks',
        duration: 298,
        audioUrl: '/audio/track26.mp3'
      }
    ]
  }
];

export const newReleases: Mixtape[] = [
  {
    id: '5',
    title: 'Future Sounds',
    artist: 'Tech Wizards',
    coverUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=1000',
    description: 'Exploring the cutting edge of electronic music.',
    releaseDate: '2024-07-01',
    tracks: [
      {
        id: '5-1',
        title: 'Digital Dreams',
        artist: 'Pixel Pusher',
        duration: 210,
        audioUrl: '/audio/track13.mp3'
      },
      {
        id: '5-2',
        title: 'Quantum Beats',
        artist: 'Byte Master',
        duration: 225,
        audioUrl: '/audio/track14.mp3'
      }
    ]
  },
  {
    id: '6',
    title: 'Acoustic Sessions',
    artist: 'Unplugged Crew',
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1000',
    description: 'Raw and authentic acoustic performances.',
    releaseDate: '2024-06-28',
    tracks: [
      {
        id: '6-1',
        title: 'Wooden Strings',
        artist: 'Guitar Hero',
        duration: 195,
        audioUrl: '/audio/track15.mp3'
      },
      {
        id: '6-2',
        title: 'Voice of Angels',
        artist: 'Vocal Virtuoso',
        duration: 220,
        audioUrl: '/audio/track16.mp3'
      }
    ]
  },
  {
    id: '11',
    title: 'Soul Revivals',
    artist: 'Vintage Grooves',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1000',
    description: 'Reimagined soul classics with a modern twist.',
    releaseDate: '2024-06-20',
    tracks: [
      {
        id: '11-1',
        title: 'Velvet Voice',
        artist: 'Silky Smith',
        duration: 238,
        audioUrl: '/audio/track27.mp3'
      },
      {
        id: '11-2',
        title: 'Rhythm & Blues',
        artist: 'The Classics',
        duration: 212,
        audioUrl: '/audio/track28.mp3'
      }
    ]
  },
  {
    id: '12',
    title: 'Latin Fusion',
    artist: 'Ritmo Collective',
    coverUrl: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?q=80&w=1000',
    description: 'Hot Latin rhythms mixed with contemporary sounds.',
    releaseDate: '2024-06-15',
    tracks: [
      {
        id: '12-1',
        title: 'Salsa Nights',
        artist: 'Havana Club',
        duration: 194,
        audioUrl: '/audio/track29.mp3'
      },
      {
        id: '12-2',
        title: 'Tropical Breeze',
        artist: 'Beach Rhythms',
        duration: 208,
        audioUrl: '/audio/track30.mp3'
      }
    ]
  },
  {
    id: '13',
    title: 'Lofi Study Beats',
    artist: 'Chill Harmony',
    coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000',
    description: 'Perfect background beats to help you focus and study.',
    releaseDate: '2024-06-10',
    tracks: [
      {
        id: '13-1',
        title: 'Midnight Coffee',
        artist: 'Study Session',
        duration: 184,
        audioUrl: '/audio/track31.mp3'
      },
      {
        id: '13-2',
        title: 'Rainy Window',
        artist: 'Ambient Dreams',
        duration: 203,
        audioUrl: '/audio/track32.mp3'
      }
    ]
  }
];

export const popularMixtapes: Mixtape[] = [
  {
    id: '7',
    title: 'Hip Hop Classics',
    artist: 'Old School Legends',
    coverUrl: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?q=80&w=1000',
    description: 'A collection of iconic hip hop tracks from the golden era.',
    releaseDate: '2024-02-15',
    tracks: [
      {
        id: '7-1',
        title: 'Street Poetry',
        artist: 'Urban Poets',
        duration: 240,
        audioUrl: '/audio/track17.mp3'
      },
      {
        id: '7-2',
        title: 'Concrete Jungle',
        artist: 'City Slickers',
        duration: 215,
        audioUrl: '/audio/track18.mp3'
      }
    ]
  },
  {
    id: '8',
    title: 'Jazz Fusion',
    artist: 'Smooth Operators',
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
    description: 'A blend of jazz with various contemporary styles.',
    releaseDate: '2024-01-20',
    tracks: [
      {
        id: '8-1',
        title: 'Saxophone Dreams',
        artist: 'Brass Masters',
        duration: 265,
        audioUrl: '/audio/track19.mp3'
      },
      {
        id: '8-2',
        title: 'Piano Reflections',
        artist: 'Keys Wizard',
        duration: 230,
        audioUrl: '/audio/track20.mp3'
      }
    ]
  },
  {
    id: '14',
    title: '90s Dance Party',
    artist: 'Retro Collective',
    coverUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000',
    description: 'Revisit the golden age of dance music with these 90s hits.',
    releaseDate: '2024-01-10',
    tracks: [
      {
        id: '14-1',
        title: 'Club Nights',
        artist: 'Dance Floor Kings',
        duration: 248,
        audioUrl: '/audio/track33.mp3'
      },
      {
        id: '14-2',
        title: 'Neon Lights',
        artist: 'Synth Wave',
        duration: 237,
        audioUrl: '/audio/track34.mp3'
      }
    ]
  },
  {
    id: '15',
    title: 'Classical Reimagined',
    artist: 'Modern Orchestra',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1000',
    description: 'Classical masterpieces rearranged with modern instruments and production.',
    releaseDate: '2023-12-20',
    tracks: [
      {
        id: '15-1',
        title: 'Digital Symphony',
        artist: 'Electric Strings',
        duration: 312,
        audioUrl: '/audio/track35.mp3'
      },
      {
        id: '15-2',
        title: 'Bach to the Future',
        artist: 'Classical Remix',
        duration: 285,
        audioUrl: '/audio/track36.mp3'
      }
    ]
  },
  {
    id: '16',
    title: 'Rock Anthems',
    artist: 'Guitar Legends',
    coverUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=1000',
    description: 'Powerful rock anthems that stand the test of time.',
    releaseDate: '2023-11-15',
    tracks: [
      {
        id: '16-1',
        title: 'Electric Solos',
        artist: 'Amplified',
        duration: 274,
        audioUrl: '/audio/track37.mp3'
      },
      {
        id: '16-2',
        title: 'Stadium Rock',
        artist: 'The Headliners',
        duration: 258,
        audioUrl: '/audio/track38.mp3'
      }
    ]
  }
];

export const trendingMixtapes: Mixtape[] = [
  {
    id: '17',
    title: 'Viral Hits 2024',
    artist: 'Internet Sensations',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000',
    description: 'The songs taking over social media this year.',
    releaseDate: '2024-05-15',
    tracks: [
      {
        id: '17-1',
        title: 'Trending Now',
        artist: 'Social Stars',
        duration: 187,
        audioUrl: '/audio/track39.mp3'
      },
      {
        id: '17-2',
        title: 'Viral Dance',
        artist: 'TikTok Crew',
        duration: 175,
        audioUrl: '/audio/track40.mp3'
      }
    ]
  },
  {
    id: '18',
    title: 'Global Sounds',
    artist: 'World Music Collective',
    coverUrl: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1000',
    description: 'Exploring diverse musical traditions from around the world.',
    releaseDate: '2024-04-20',
    tracks: [
      {
        id: '18-1',
        title: 'African Rhythms',
        artist: 'Drum Circle',
        duration: 256,
        audioUrl: '/audio/track41.mp3'
      },
      {
        id: '18-2',
        title: 'Asian Melodies',
        artist: 'Eastern Sounds',
        duration: 224,
        audioUrl: '/audio/track42.mp3'
      }
    ]
  },
  {
    id: '19',
    title: 'Ambient Spaces',
    artist: 'Sound Architects',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
    description: 'Immersive ambient soundscapes for focus and relaxation.',
    releaseDate: '2024-03-30',
    tracks: [
      {
        id: '19-1',
        title: 'Floating',
        artist: 'Zero Gravity',
        duration: 304,
        audioUrl: '/audio/track43.mp3'
      },
      {
        id: '19-2',
        title: 'Deep Space',
        artist: 'Cosmic Waves',
        duration: 342,
        audioUrl: '/audio/track44.mp3'
      }
    ]
  },
  {
    id: '20',
    title: 'Morning Coffee',
    artist: 'Sunrise Sessions',
    coverUrl: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=1000',
    description: 'Gentle music to start your day on the right note.',
    releaseDate: '2024-02-25',
    tracks: [
      {
        id: '20-1',
        title: 'First Light',
        artist: 'Dawn Chorus',
        duration: 218,
        audioUrl: '/audio/track45.mp3'
      },
      {
        id: '20-2',
        title: 'Awakening',
        artist: 'Morning Dew',
        duration: 245,
        audioUrl: '/audio/track46.mp3'
      }
    ]
  }
];

export const getMixtapeById = (id: string): Mixtape | undefined => {
  return [...featuredMixtapes, ...newReleases, ...popularMixtapes, ...trendingMixtapes].find(mixtape => mixtape.id === id);
}; 