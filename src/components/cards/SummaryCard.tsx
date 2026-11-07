import { clsx } from 'clsx';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'indigo' | 'cyan' | 'purple' | 'amber' | 'blue' | 'green' | 'red';
}

const colorMap = {
  indigo: {
    icon: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
  },
  cyan: {
    icon: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400',
  },
  purple: {
    icon: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  },
  blue: {
    icon: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
  },
  green: {
    icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
  },
  red: {
    icon: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
  },
};

export function SummaryCard({ title, value, subtitle, icon, trend, color = 'indigo' }: SummaryCardProps) {
  const colors = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-5 shadow-xs hover:shadow-md transition-all duration-200">
      {/* Top row: Icon on left, trend badge on right (Matching Reference Image) */}
      <div className="flex items-center justify-between mb-4">
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs', colors.icon)}>
          {icon}
        </div>

        {trend && (
          <div className={clsx(
            'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full',
            trend.positive
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50'
              : 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-100 dark:border-rose-800/50',
          )}>
            {trend.value}
          </div>
        )}
      </div>

      {/* Metric Label & Big Bold Value */}
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
