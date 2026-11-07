import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { Project } from '../../types/project';
import { formatCurrency } from '../../lib/formatters';

interface CostTrendChartProps {
  projects: Project[];
}

function aggregateCostTrend(projects: Project[]) {
  const monthMap: Record<string, { budgeted: number; actual: number; count: number }> = {};

  for (const project of projects) {
    for (const point of project.costTrend) {
      if (!monthMap[point.month]) {
        monthMap[point.month] = { budgeted: 0, actual: 0, count: 0 };
      }
      monthMap[point.month].budgeted += point.budgeted;
      monthMap[point.month].actual += point.actual;
      monthMap[point.month].count += 1;
    }
  }

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return Object.entries(monthMap)
    .sort(([a], [b]) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
    .map(([month, vals]) => ({
      month,
      Budgeted: Math.round(vals.budgeted),
      Actual: Math.round(vals.actual),
    }));
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-500 dark:text-slate-400">{entry.name}:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {formatCurrency(entry.value, true)}
          </span>
        </div>
      ))}
    </div>
  );
};

export function CostTrendChart({ projects }: CostTrendChartProps) {
  const [timeframe, setTimeframe] = useState('All Lifecycle');
  const data = aggregateCostTrend(projects);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs">
      {/* Header (Matching Reference Image) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Revenue & Cost Trajectory
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Monthly spend and planned budget allocation across active projects
          </p>
        </div>

        {/* View by Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium">View by:</span>
          <select
            value={timeframe}
            onChange={e => setTimeframe(e.target.value)}
            className="text-xs font-semibold bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
          >
            <option value="All Lifecycle">All Lifecycle</option>
            <option value="Last 12 Months">Last 12 Months</option>
            <option value="Current Quarter">Current Quarter</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:[&>line]:stroke-slate-700/40" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={v => formatCurrency(v, true)}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: 12, paddingBottom: 16 }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="Budgeted"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#budgetGradient)"
            />
            <Line
              type="monotone"
              dataKey="Actual"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 3, fill: '#a855f7' }}
              activeDot={{ r: 5 }}
              strokeDasharray="5 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
