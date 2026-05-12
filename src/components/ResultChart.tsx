'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ElectionResult } from '@/lib/scraper';

interface Props {
  data: ElectionResult[];
}

export default function ResultChart({ data }: Props) {
  // Format data for Recharts
  const chartData = data.map(d => ({
    name: d.party,
    Won: d.won,
    Leading: d.leading,
    Total: d.total,
    fill: d.party === 'NDA' ? '#f97316' : d.party.includes('I.N.D.I.A') ? '#22c55e' : '#a8a29e',
  }));

  return (
    <div className="w-full" style={{ minHeight: '300px', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Bar dataKey="Won" stackId="a" fill="#3b82f6" />
          <Bar dataKey="Leading" stackId="a" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
