import { SummaryCardRow } from '../components/cards/SummaryCardRow';
import { CostTrendChart } from '../components/charts/CostTrendChart';
import { StatusPieChart } from '../components/charts/StatusPieChart';
import { DelayDistribution } from '../components/charts/DelayDistribution';
import { RecentProjectsCard } from '../components/table/RecentProjectsCard';
import { AlertPanel } from '../components/alerts/AlertPanel';
import { InsightPanel } from '../components/insights/InsightPanel';
import { PredictiveRiskPanel } from '../components/alerts/PredictiveRiskPanel';
import { useProjects } from '../hooks/useProjects';

type ProjectsData = ReturnType<typeof useProjects>;

interface DashboardProps {
  data: ProjectsData;
  onNavigate?: (page: string) => void;
}

export function Dashboard({ data, onNavigate }: DashboardProps) {
  const { projects, kpis, alerts, insights, predictiveRisks } = data;

  return (
    <div className="space-y-6">
      {/* Row 1: KPI Summary Cards (4 Cards matching Reference Image) */}
      <SummaryCardRow kpis={kpis} predictiveRisks={predictiveRisks} />

      {/* Row 2: Charts Row (Revenue Growth & Traffic Sources Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CostTrendChart projects={projects} />
        </div>
        <div className="lg:col-span-1">
          <StatusPieChart projects={projects} />
        </div>
      </div>

      {/* Row 3: Secondary Trajectory & Recent Projects Table (Matching Reference Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DelayDistribution projects={projects} />
        <RecentProjectsCard
          projects={projects}
          onViewAll={() => onNavigate && onNavigate('projects')}
        />
      </div>

      {/* Row 4: Alerts & AI Operational Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertPanel alerts={alerts} />
        <InsightPanel insights={insights} />
      </div>

      {/* Row 5: Predictive Risk Intelligence Panel */}
      <PredictiveRiskPanel projects={projects} predictiveRisks={predictiveRisks} />
    </div>
  );
}
