import { ProjectTable } from '../components/table/ProjectTable';
import { useProjects } from '../hooks/useProjects';

type ProjectsData = ReturnType<typeof useProjects>;

interface ProjectsPageProps {
  data: ProjectsData;
}

export function Projects({ data }: ProjectsPageProps) {
  const { projects, filteredProjects, filters, updateFilters, predictiveRisks } = data;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Project Portfolio</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Manage, filter, and track all active initiatives across the enterprise portfolio
        </p>
      </div>
      <ProjectTable
        projects={filteredProjects}
        allProjects={projects}
        filters={filters}
        onFiltersChange={updateFilters}
        predictiveRisks={predictiveRisks}
      />
    </div>
  );
}
