import type { Project, FilterState, PredictiveRisk } from '../../types/project';
import { TableRow } from './TableRow';
import { TableFilters } from './TableFilters';
import { FolderKanban } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  allProjects: Project[];
  filters: FilterState;
  onFiltersChange: (partial: Partial<FilterState>) => void;
  predictiveRisks: Record<string, PredictiveRisk>;
}

const headers = [
  { label: 'Project', width: 'w-52' },
  { label: 'Lead / Manager', width: 'w-32' },
  { label: 'Category', width: 'w-24' },
  { label: 'Status', width: 'w-24' },
  { label: 'Actual Cost', width: 'w-28' },
  { label: 'Variance', width: 'w-24' },
  { label: 'Progress', width: 'w-32' },
  { label: 'Risk Score', width: 'w-28' },
  { label: 'Pred. Risk', width: 'w-24' },
];

export function ProjectTable({ projects, allProjects, filters, onFiltersChange, predictiveRisks }: ProjectTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs overflow-hidden">
      {/* Filters */}
      <div className="p-4 lg:p-5 border-b border-slate-100 dark:border-slate-800">
        <TableFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          totalCount={allProjects.length}
          filteredCount={projects.length}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60">
              {headers.map(h => (
                <th
                  key={h.label}
                  className={`px-4 py-3.5 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider ${h.width}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <FolderKanban size={36} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No projects match your filters</p>
                  <p className="text-xs text-slate-400 mt-1">Try clearing or adjusting your search parameters</p>
                </td>
              </tr>
            ) : (
              projects.map((project, i) => (
                <TableRow key={project.id} project={project} index={i} predictiveRisk={predictiveRisks[project.id]} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
