'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const years = [
  { id: 'live', label: 'Live 2026' },
  { id: '2024', label: 'Final 2024' },
  { id: '2019', label: 'Final 2019' },
];

export default function YearSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = searchParams.get('year') || 'live';
  const [isPending, startTransition] = useTransition();
  const [optimisticYear, setOptimisticYear] = useState(currentYear);

  const handleYearChange = useCallback((year: string) => {
    setOptimisticYear(year);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (year === 'live') {
        params.delete('year');
      } else {
        params.set('year', year);
      }
      router.push(`/?${params.toString()}`);
    });
  }, [router, searchParams]);

  return (
    <div className="flex items-center space-x-2 bg-black/50 p-1.5 rounded-lg border border-white/10 w-fit">
      {years.map((y) => {
        const isActive = optimisticYear === y.id;
        return (
          <button
            key={y.id}
            onClick={() => handleYearChange(y.id)}
            disabled={isPending && !isActive}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2",
              isActive 
                ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            {isPending && isActive && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{y.label}</span>
          </button>
        );
      })}
    </div>
  );
}
