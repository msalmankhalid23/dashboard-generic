import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import type { Project } from '../../types/project';

interface DelayDistributionProps {
  projects: Project[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-slate-800 dark:text-slate-200">{item.fullName}</p>
      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
        <span className="font-semibold" style={{ color: item.color }}>{item.daysLate}</span> days behind schedule
      </p>
    </div>
  );
};

const COLORS: Record<string, string> = {
  'On Time': '#4f46e5',
  'At Risk': '#06b6d4',
  'High Risk': '#8b5cf6',
  'Critical': '#f43f5e',
};

export function DelayDistribution({ projects }: DelayDistributionProps) {
  const data = projects.map(p => ({
    name: p.name.length > 18 ? p.name.slice(0, 16) + '…' : p.name,
    fullName: p.name,
    daysLate: p.daysLate,
    status: p.status,
    color: COLORS[p.status] ?? '#4f46e5',
  })).sort((a, b) => b.daysLate - a.daysLate).slice(0, 6);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Schedule & Delay Variance
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Days variance from expected delivery milestone
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[220px] my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" className="dark:[&>line]:stroke-slate-700/40" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="daysLate" radius={[0, 6, 6, 0]} barSize={14}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        <span>Target: 0 days variance</span>
        <span className="font-medium text-indigo-600 dark:text-indigo-400">Top Delays Tracked</span>
      </div>
    </div>
  );
}
