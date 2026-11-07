import { CostTrendChart } from '../components/charts/CostTrendChart';
import { DelayDistribution } from '../components/charts/DelayDistribution';
import { StatusPieChart } from '../components/charts/StatusPieChart';
import { RiskScoreChart } from '../components/charts/RiskScoreChart';
import { useProjects } from '../hooks/useProjects';
import { formatCurrency, formatPercent } from '../lib/formatters';

type ProjectsData = ReturnType<typeof useProjects>;

interface AnalyticsProps {
  data: ProjectsData;
}

export function Analytics({ data }: AnalyticsProps) {
  const { projects, kpis } = data;

  const totalOverrun = projects
    .filter(p => p.actualCost > p.budget)
    .reduce((s, p) => s + (p.actualCost - p.budget), 0);

  const avgCompletion =
    projects.length > 0 ? projects.reduce((s, p) => s + p.completionPercent, 0) / projects.length : 0;

  const totalChangeOrders = projects.reduce((s, p) => s + p.changeOrders, 0);
  const totalSafetyIncidents = projects.reduce((s, p) => s + p.safetyIncidents, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Analytics Overview</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Deep-dive into portfolio performance and financial variance metrics
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Budget Overrun',
            value: formatCurrency(totalOverrun, true),
            sub: `${kpis.overBudgetProjects} projects over budget`,
            color: 'text-rose-600 dark:text-rose-400',
          },
          {
            label: 'Avg Completion Rate',
            value: formatPercent(avgCompletion, 0),
            sub: 'Across active portfolio',
            color: 'text-indigo-600 dark:text-indigo-400',
          },
          {
            label: 'Scope / Change Requests',
            value: String(totalChangeOrders),
            sub: 'Total across portfolio',
            color: 'text-amber-600 dark:text-amber-400',
          },
          {
            label: 'Quality & Risk Flags',
            value: String(totalSafetyIncidents),
            sub: 'Recorded active flags',
            color: totalSafetyIncidents > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400',
          },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-5 shadow-xs"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} tracking-tight`}>{stat.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* All 4 charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CostTrendChart projects={projects} />
        <StatusPieChart projects={projects} />
        <DelayDistribution projects={projects} />
        <RiskScoreChart projects={projects} />
      </div>
    </div>
  );
}
