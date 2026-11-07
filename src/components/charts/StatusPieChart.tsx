import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { Project, ProjectStatus } from '../../types/project';

interface StatusPieChartProps {
  projects: Project[];
}

const STATUS_CONFIG: Record<ProjectStatus, { color: string; label: string }> = {
  'On Time': { color: '#4f46e5', label: 'On Time' },
  'At Risk': { color: '#06b6d4', label: 'At Risk' },
  'High Risk': { color: '#8b5cf6', label: 'High Risk' },
  'Critical': { color: '#f43f5e', label: 'Critical' },
};

export function StatusPieChart({ projects }: StatusPieChartProps) {
  const statusCounts: Record<string, number> = {
    'On Time': 0,
    'At Risk': 0,
    'High Risk': 0,
    'Critical': 0,
  };

  for (const p of projects) {
    statusCounts[p.status] = (statusCounts[p.status] ?? 0) + 1;
  }

  const total = projects.length || 1;
  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
    pct: Math.round((value / total) * 100),
    color: STATUS_CONFIG[name as ProjectStatus]?.color ?? '#94a3b8',
    label: STATUS_CONFIG[name as ProjectStatus]?.label ?? name,
  })).filter(d => d.value > 0);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Portfolio Allocation
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Health & schedule status distribution
        </p>
      </div>

      {/* Donut Chart (Matching InsightFlow Reference Image) */}
      <div className="w-full h-[180px] my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-2.5 shadow-lg text-xs">
                    <p className="font-semibold" style={{ color: d.color }}>{d.label}</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      {d.value} project{d.value !== 1 ? 's' : ''} ({d.pct}%)
                    </p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 2x2 Legend Grid Below (Matching Reference Image) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mr-1.5">{item.pct}%</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
