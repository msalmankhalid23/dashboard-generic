import { clsx } from 'clsx';
import { ShieldAlert } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import type { PredictiveRisk, Project } from '../types/project';

type ProjectsData = ReturnType<typeof useProjects>;

interface PredictiveRisksProps {
  data: ProjectsData;
}

const levelStyles: Record<string, { badge: string; dot: string; row: string }> = {
  High: { badge: 'bg-rose-50 text-rose-600 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400', dot: 'bg-rose-500', row: 'border-l-4 border-rose-500' },
  Medium: { badge: 'bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400', dot: 'bg-amber-400', row: 'border-l-4 border-amber-400' },
  Low: { badge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400', dot: 'bg-emerald-500', row: 'border-l-4 border-emerald-500' },
};

function RiskCard({ project, risk }: { project: Project; risk: PredictiveRisk }) {
  const styles = levelStyles[risk.level];
  return (
    <div className={clsx(
      'bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs p-5 transition-shadow hover:shadow-md',
      styles.row,
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{project.name}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{project.location} · {project.manager}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-medium">Score: {risk.score}/10</span>
          <span className={clsx('text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs', styles.badge)}>
            {risk.level} Risk
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {risk.reasons.map(r => (
          <span
            key={r}
            className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 font-medium"
          >
            {r}
          </span>
        ))}
      </div>

      {/* Score bar */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
          <div
            className={clsx('h-1.5 rounded-full transition-all', styles.dot)}
            style={{ width: `${(risk.score / 10) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">{risk.score}/10</span>
      </div>
    </div>
  );
}

export function PredictiveRisks({ data }: PredictiveRisksProps) {
  const { projects, predictiveRisks } = data;

  const sorted = [...projects].sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[predictiveRisks[a.id].level] - order[predictiveRisks[b.id].level];
  });

  const high = sorted.filter(p => predictiveRisks[p.id].level === 'High');
  const medium = sorted.filter(p => predictiveRisks[p.id].level === 'Medium');
  const low = sorted.filter(p => predictiveRisks[p.id].level === 'Low');

  function Section({ title, items, dot }: { title: string; items: Project[]; dot: string }) {
    if (items.length === 0) return null;
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className={clsx('w-2.5 h-2.5 rounded-full', dot)} />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title} ({items.length})</h3>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {items.map(p => <RiskCard key={p.id} project={p} risk={predictiveRisks[p.id]} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ShieldAlert size={17} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Predictive Risk Intelligence</h2>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Automated rule-based risk evaluation flagging projects likely to experience schedule slips or budget variance
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'High Risk', count: high.length, badge: 'bg-rose-50 text-rose-600 border border-rose-200/50 dark:bg-rose-950/40 dark:text-rose-400' },
          { label: 'Medium Risk', count: medium.length, badge: 'bg-amber-50 text-amber-600 border border-amber-200/50 dark:bg-amber-950/40 dark:text-amber-400' },
          { label: 'Low Risk', count: low.length, badge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400' },
        ].map(({ label, count, badge }) => (
          <div key={label} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs p-5 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{count}</p>
            <span className={clsx('text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1.5 inline-block', badge)}>{label}</span>
          </div>
        ))}
      </div>

      <Section title="High Risk Alerts" items={high} dot="bg-rose-500" />
      <Section title="Medium Risk Warnings" items={medium} dot="bg-amber-400" />
      <Section title="Low Risk / Healthy Projects" items={low} dot="bg-emerald-500" />
    </div>
  );
}
