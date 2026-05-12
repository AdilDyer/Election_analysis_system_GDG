'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ElectionResult } from '@/lib/scraper';

interface Props {
  data: ElectionResult[];
}

export default function ParliamentChart({ data }: Props) {
  // Add a dummy entry to fill the rest of the 543 seats if total is less
  const totalSeats = data.reduce((acc, curr) => acc + curr.total, 0);
  const majorityMark = 272;

  const chartData = data.map(d => ({
    name: d.party,
    value: d.total,
    fill: d.party === 'NDA' ? '#f97316' : d.party.includes('I.N.D.I.A') ? '#22c55e' : '#a8a29e',
  }));

  // Recharts PieChart uses angles. 180 to 0 makes a half-circle arch.
  return (
    <div className="w-full relative" style={{ minHeight: '300px', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={140}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center majority mark text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-4">
        <div className="text-4xl font-black">{totalSeats}</div>
        <div className="text-sm text-zinc-400">Total Seats Declared</div>
        <div className="text-xs font-mono mt-1 px-2 py-0.5 bg-white/10 rounded">Majority: {majorityMark}</div>
      </div>
    </div>
  );
}
