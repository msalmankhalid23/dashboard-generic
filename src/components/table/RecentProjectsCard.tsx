import type { Project } from '../../types/project';
import { formatCurrency } from '../../lib/formatters';
import { StatusBadge } from './StatusBadge';

interface RecentProjectsCardProps {
  projects: Project[];
  onViewAll?: () => void;
}

export function RecentProjectsCard({ projects, onViewAll }: RecentProjectsCardProps) {
  const recent = projects.slice(0, 6);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-indigo-500 text-white',
      'bg-emerald-500 text-white',
      'bg-purple-500 text-white',
      'bg-cyan-500 text-white',
      'bg-amber-500 text-white',
      'bg-rose-500 text-white',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs flex flex-col justify-between">
      {/* Header with View All Link (Matching InsightFlow Reference Image) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Recent Projects
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Active portfolio activity and health status
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline cursor-pointer transition-colors"
          >
            View All
          </button>
        )}
      </div>

      {/* Table (Matching "Recent Customers" Layout) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/60">
              <th className="pb-3 font-semibold">Project</th>
              <th className="pb-3 font-semibold">Type</th>
              <th className="pb-3 font-semibold">Cost / Budget</th>
              <th className="pb-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 text-xs">
            {recent.map((p, idx) => (
              <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs ${getAvatarColor(idx)}`}>
                      {getInitials(p.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{p.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{p.location || p.manager}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{p.type}</span>
                </td>
                <td className="py-3 pr-3 font-semibold text-slate-800 dark:text-slate-200">
                  {formatCurrency(p.actualCost, true)}
                </td>
                <td className="py-3 text-right">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
