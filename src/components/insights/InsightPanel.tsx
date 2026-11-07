import type { Insight } from '../../types/project';
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

interface InsightPanelProps {
  insights: Insight[];
}

const impactConfig = {
  positive: {
    icon: <TrendingUp size={14} />,
    color: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50',
    border: 'border-l-4 border-l-emerald-500',
  },
  negative: {
    icon: <TrendingDown size={14} />,
    color: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50',
    border: 'border-l-4 border-l-rose-500',
  },
  neutral: {
    icon: <Minus size={14} />,
    color: 'text-slate-500 dark:text-slate-400',
    badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/50',
    border: 'border-l-4 border-l-slate-400',
  },
};

export function InsightPanel({ insights }: InsightPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Executive AI Insights
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Synthesized portfolio intelligence observations
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
          Rule Engine
        </span>
      </div>

      <div className="space-y-3">
        {insights.map(insight => {
          const config = impactConfig[insight.impact];
          return (
            <div
              key={insight.id}
              className={clsx(
                'p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 transition-colors',
                config.border,
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={config.color}>{config.icon}</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {insight.title}
                  </span>
                </div>
                {insight.metric && (
                  <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0', config.badge)}>
                    {insight.metric}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
