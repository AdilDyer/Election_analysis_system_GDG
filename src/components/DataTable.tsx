import { ElectionResult } from '@/lib/scraper';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  data: ElectionResult[];
}

export default function DataTable({ data }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-zinc-400">
            <th className="py-3 px-4 font-medium">Party</th>
            <th className="py-3 px-4 font-medium text-right">Total</th>
            <th className="py-3 px-4 font-medium text-right">Won</th>
            <th className="py-3 px-4 font-medium text-right">Leading</th>
            <th className="py-3 px-4 font-medium text-right">Swing vs Prev</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row) => {
            const swing = row.total - row.previousTotal;
            const isPositive = swing > 0;
            const isNegative = swing < 0;

            return (
              <tr key={row.party} className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-medium flex items-center space-x-2">
                  <div className={clsx(
                    "w-3 h-3 rounded-full",
                    row.party === 'NDA' ? 'bg-orange-500' : row.party.includes('I.N.D.I.A') ? 'bg-green-500' : 'bg-stone-400'
                  )} />
                  <span>{row.party}</span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-lg">{row.total}</td>
                <td className="py-3 px-4 text-right text-zinc-300">{row.won}</td>
                <td className="py-3 px-4 text-right text-zinc-300">{row.leading}</td>
                <td className="py-3 px-4 text-right">
                  <div className={clsx(
                    "inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-bold",
                    isPositive ? "bg-green-500/10 text-green-400" :
                    isNegative ? "bg-red-500/10 text-red-400" :
                    "bg-zinc-500/10 text-zinc-400"
                  )}>
                    {isPositive ? <ChevronUp className="w-3 h-3" /> :
                     isNegative ? <ChevronDown className="w-3 h-3" /> :
                     <Minus className="w-3 h-3" />}
                    <span>{Math.abs(swing)}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
