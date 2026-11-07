import type { Project, PredictiveRisk } from '../../types/project';
import { StatusBadge } from './StatusBadge';
import { formatCurrency, formatPercent, isOverBudget } from '../../lib/formatters';
import { clsx } from 'clsx';

interface TableRowProps {
  project: Project;
  index: number;
  predictiveRisk: PredictiveRisk;
}

const predLevelStyles: Record<string, string> = {
  High: 'bg-rose-50 text-rose-600 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400',
  Medium: 'bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400',
  Low: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400',
};

function RiskBar({ score }: { score: number }) {
  const color =
    score >= 70 ? 'bg-rose-500' :
    score >= 40 ? 'bg-orange-500' :
    score >= 20 ? 'bg-amber-400' :
    'bg-emerald-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 min-w-[55px]">
        <div className={clsx('h-1.5 rounded-full transition-all', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 w-6 text-right">{score}</span>
    </div>
  );
}

export function TableRow({ project, index, predictiveRisk }: TableRowProps) {
  const overBudget = isOverBudget(project.budget, project.actualCost);
  const budgetVariancePct = ((project.actualCost - project.budget) / project.budget * 100).toFixed(1);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (idx: number) => {
    const colors = [
      'bg-indigo-500 text-white',
      'bg-emerald-500 text-white',
      'bg-purple-500 text-white',
      'bg-cyan-500 text-white',
      'bg-amber-500 text-white',
      'bg-rose-500 text-white',
    ];
    return colors[idx % colors.length];
  };

  return (
    <tr className={clsx(
      'border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors',
      index % 2 === 0 ? 'bg-white dark:bg-slate-900/60' : 'bg-slate-50/30 dark:bg-slate-800/20',
    )}>
      {/* Project with Avatar */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs ${getAvatarColor(index)}`}>
            {getInitials(project.name)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{project.name}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{project.location}</p>
          </div>
        </div>
      </td>

      {/* Lead / Manager */}
      <td className="px-4 py-3.5">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{project.manager}</p>
      </td>

      {/* Type */}
      <td className="px-4 py-3.5">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
          {project.type}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <StatusBadge status={project.status} />
      </td>

      {/* Cost & Budget Variance */}
      <td className="px-4 py-3.5">
        <div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            {formatCurrency(project.actualCost, true)}
          </p>
          <p className={clsx(
            'text-[10px] font-medium',
            overBudget ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400',
          )}>
            {overBudget ? '+' : ''}{budgetVariancePct}% vs plan
          </p>
        </div>
      </td>

      {/* Schedule Variance */}
      <td className="px-4 py-3.5">
        <div>
          {project.daysLate === 0 ? (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">On time</span>
          ) : (
            <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
              +{project.daysLate}d delay
            </span>
          )}
        </div>
      </td>

      {/* Progress */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 min-w-[50px]">
            <div
              className="h-1.5 rounded-full bg-indigo-600 transition-all"
              style={{ width: `${project.completionPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 w-8 text-right">
            {formatPercent(project.completionPercent, 0)}
          </span>
        </div>
      </td>

      {/* Risk Score */}
      <td className="px-4 py-3.5 min-w-[90px]">
        <RiskBar score={project.riskScore} />
      </td>

      {/* Predictive Risk */}
      <td className="px-4 py-3.5">
        <div className="relative group inline-block">
          <span className={clsx('text-[11px] font-semibold px-2.5 py-0.5 rounded-full cursor-default shadow-2xs', predLevelStyles[predictiveRisk.level])}>
            {predictiveRisk.level}
          </span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 hidden group-hover:block w-52 bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl pointer-events-none">
            <p className="font-semibold mb-1.5">Risk Score: {predictiveRisk.score}/10</p>
            <ul className="space-y-0.5">
              {predictiveRisk.reasons.map(r => (
                <li key={r} className="text-slate-300">• {r}</li>
              ))}
            </ul>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900" />
          </div>
        </div>
      </td>
    </tr>
  );
}
