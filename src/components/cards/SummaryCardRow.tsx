import { SummaryCard } from './SummaryCard';
import type { KPISummary, PredictiveRisk } from '../../types/project';
import { formatCurrency, formatPercent } from '../../lib/formatters';
import { Layers, Clock, TrendingUp, ShieldAlert } from 'lucide-react';

interface SummaryCardRowProps {
  kpis: KPISummary;
  predictiveRisks: Record<string, PredictiveRisk>;
}

export function SummaryCardRow({ kpis, predictiveRisks }: SummaryCardRowProps) {
  const onTimePct = kpis.totalProjects > 0 ? (kpis.onTimeProjects / kpis.totalProjects) * 100 : 0;
  const budgetVariancePct = kpis.totalBudget > 0 ? ((kpis.totalActualCost - kpis.totalBudget) / kpis.totalBudget) * 100 : 0;
  const isOverBudget = kpis.totalActualCost > kpis.totalBudget;
  const highRiskCount = Object.values(predictiveRisks).filter(r => r.level === 'High').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <SummaryCard
        title="Active Projects Portfolio"
        value={`${kpis.totalProjects}`}
        subtitle={`${kpis.criticalProjects} requiring attention`}
        icon={<Layers size={20} />}
        color="indigo"
        trend={{
          value: '+12.5%',
          positive: true,
        }}
      />
      <SummaryCard
        title="On-Time Delivery Rate"
        value={formatPercent(onTimePct, 1)}
        subtitle={`${kpis.onTimeProjects} of ${kpis.totalProjects} on schedule`}
        icon={<Clock size={20} />}
        color="cyan"
        trend={{
          value: '+5.2%',
          positive: onTimePct >= 50,
        }}
      />
      <SummaryCard
        title="Total Portfolio Budget"
        value={formatCurrency(kpis.totalBudget, true)}
        subtitle={`Actual: ${formatCurrency(kpis.totalActualCost, true)}`}
        icon={<TrendingUp size={20} />}
        color="purple"
        trend={{
          value: `${isOverBudget ? '+' : ''}${formatPercent(budgetVariancePct, 1)}`,
          positive: !isOverBudget,
        }}
      />
      <SummaryCard
        title="Risk Index & Health"
        value={`${kpis.avgRiskScore} / 100`}
        subtitle={`${highRiskCount} high risk projects`}
        icon={<ShieldAlert size={20} />}
        color={highRiskCount > 0 ? 'red' : 'amber'}
        trend={{
          value: highRiskCount === 0 ? '+2.1%' : '-4.5%',
          positive: highRiskCount === 0,
        }}
      />
    </div>
  );
}
