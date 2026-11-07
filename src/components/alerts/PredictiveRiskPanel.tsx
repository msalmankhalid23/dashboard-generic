import { clsx } from 'clsx';
import { ShieldAlert } from 'lucide-react';
import type { Project, PredictiveRisk } from '../../types/project';

interface PredictiveRiskPanelProps {
  projects: Project[];
  predictiveRisks: Record<string, PredictiveRisk>;
}

const levelStyles: Record<string, { badge: string; dot: string }> = {
  High: { badge: 'bg-rose-50 text-rose-600 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400', dot: 'bg-rose-500' },
  Medium: { badge: 'bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400', dot: 'bg-amber-400' },
  Low: { badge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400', dot: 'bg-emerald-500' },
};

export function PredictiveRiskPanel({ projects, predictiveRisks }: PredictiveRiskPanelProps) {
  const sorted = [...projects].sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[predictiveRisks[a.id].level] - order[predictiveRisks[b.id].level];
  });

  const highCount = sorted.filter(p => predictiveRisks[p.id].level === 'High').length;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ShieldAlert size={17} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Predictive Risk Alerts
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Rule-based risk scoring and early warning telemetry
            </p>
          </div>
        </div>
        {highCount > 0 && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50">
            {highCount} high risk projects
          </span>
        )}
      </div>

      <ul className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {sorted.map(project => {
          const risk = predictiveRisks[project.id];
          const styles = levelStyles[risk.level];
          return (
            <li key={project.id} className="px-6 py-3.5 flex items-center gap-3.5 group relative hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
              <span className={clsx('w-2.5 h-2.5 rounded-full shrink-0', styles.dot)} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{project.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{risk.reasons.join(' · ')}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs text-slate-400 font-medium">Score: {risk.score}/10</span>
                <span className={clsx('text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs', styles.badge)}>
                  {risk.level}
                </span>
              </div>

              {/* Tooltip */}
              <div className="absolute right-6 bottom-full mb-2 z-20 hidden group-hover:block w-60 bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl pointer-events-none">
                <p className="font-semibold mb-1">Risk Score: {risk.score}/10 — {risk.level} Risk</p>
                <ul className="space-y-0.5">
                  {risk.reasons.map(r => (
                    <li key={r} className="text-slate-300">• {r}</li>
                  ))}
                </ul>
                <div className="absolute top-full right-8 -mt-px border-4 border-transparent border-t-slate-900" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
