import AntigravityCard from '@/components/AntigravityCard';
import ParliamentChart from '@/components/ParliamentChart';
import DataTable from '@/components/DataTable';
import YearSelector from '@/components/YearSelector';
import MapChart from '@/components/MapChart';
import { scrapeECIResults } from '@/lib/scraper';
import { Activity, Map, Table2, TrendingUp } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  // Await searchParams in Next 15
  const params = await searchParams;
  const year = typeof params.year === 'string' ? params.year : 'live';

  // Fetch data based on selected year
  const results = await scrapeECIResults('S03', year, true);
  
  const isLive = year === 'live';

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      
      {/* Top Bar / Marquee Area */}
      <div className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-200 px-4 py-2 rounded-lg flex items-center space-x-3 overflow-hidden">
        <Activity className="w-4 h-4 shrink-0 animate-pulse text-blue-400" />
        <div className="text-sm font-medium whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          LATEST INTELLIGENCE: {isLive ? 'Counting currently active. Next update expected in 2 minutes.' : `Viewing finalized results for ${year}.`}
        </div>
      </div>

      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Election Intelligence
          </h1>
          <p className="text-lg text-zinc-400 font-light tracking-wide mt-2">
            Advanced Analytics & Operations Center
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Select Dataset</span>
          <YearSelector />
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
        
        {/* Parliament Arch / Path to 272 */}
        <div className="col-span-1 lg:col-span-7 row-span-2">
          <AntigravityCard>
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold tracking-tight">Path to Majority (272)</h2>
            </div>
            <div className="w-full flex-grow flex items-end justify-center pt-8">
              <ParliamentChart data={results} />
            </div>
          </AntigravityCard>
        </div>

        {/* Data Table */}
        <div className="col-span-1 lg:col-span-5 row-span-2">
          <AntigravityCard>
            <div className="flex items-center space-x-3 mb-4">
              <Table2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold tracking-tight">Detailed Breakdown</h2>
            </div>
            <DataTable data={results} />
          </AntigravityCard>
        </div>

        {/* Live Swing Map */}
        <div className="col-span-1 lg:col-span-12 h-[500px]">
          <AntigravityCard>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Map className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-bold tracking-tight">Geospatial Swing Analysis</h2>
              </div>
            </div>
            <MapChart />
          </AntigravityCard>
        </div>

      </div>

    </main>
  );
}
