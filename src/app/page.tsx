import Layout from '@/components/layout/Layout';
import MixtapeSection from '@/components/mixtapes/MixtapeSection';
import { featuredMixtapes, newReleases, popularMixtapes, trendingMixtapes } from '@/lib/data';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Listen Now</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Discover the best mixtapes curated for your listening pleasure. Updated regularly.
          </p>
        </div>
        
        <MixtapeSection 
          title="Featured Mixtapes" 
          mixtapes={featuredMixtapes.slice(0, 16)} 
          seeAllHref="/featured"
        />
        
        <MixtapeSection 
          title="Trending Now" 
          mixtapes={trendingMixtapes.slice(0, 16)} 
          seeAllHref="/trending"
        />
        
        <MixtapeSection 
          title="New Releases" 
          mixtapes={newReleases.slice(0, 16)} 
          seeAllHref="/new-releases"
        />
        
        <MixtapeSection 
          title="Popular Mixtapes" 
          mixtapes={popularMixtapes.slice(0, 16)} 
          seeAllHref="/popular"
        />
      </div>
    </Layout>
  );
}
