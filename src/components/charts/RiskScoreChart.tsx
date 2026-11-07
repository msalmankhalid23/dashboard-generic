import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from 'recharts';
import type { Project } from '../../types/project';

interface RiskScoreChartProps {
  projects: Project[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{label}</p>
      <p className="text-slate-600 dark:text-slate-400">Risk Score: <strong className="text-slate-900 dark:text-white">{payload[0].value}/100</strong></p>
    </div>
  );
};

function getRiskColor(score: number): string {
  if (score >= 70) return '#f43f5e';
  if (score >= 40) return '#f97316';
  if (score >= 20) return '#f59e0b';
  return '#10b981';
}

export function RiskScoreChart({ projects }: RiskScoreChartProps) {
  const data = projects
    .map(p => ({
      name: p.name.length > 16 ? p.name.slice(0, 14) + '…' : p.name,
      fullName: p.name,
      riskScore: p.riskScore,
    }))
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Risk Index by Project (0–100)
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Composite score evaluating delay, budget overrun, and task risk
        </p>
      </div>

      <div className="w-full h-[240px] my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 12, bottom: 35, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:[&>line]:stroke-slate-700/40" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              angle={-25}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={70} stroke="#f43f5e" strokeDasharray="4 2" label={{ value: 'Critical', fontSize: 10, fill: '#f43f5e', position: 'right' }} />
            <ReferenceLine y={40} stroke="#f97316" strokeDasharray="4 2" label={{ value: 'High', fontSize: 10, fill: '#f97316', position: 'right' }} />
            <Bar dataKey="riskScore" radius={[6, 6, 0, 0]} barSize={20}>
              {data.map((entry, i) => (
                <Cell key={i} fill={getRiskColor(entry.riskScore)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
