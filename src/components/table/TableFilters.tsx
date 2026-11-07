import type { FilterState, ProjectStatus, Project, SortField } from '../../types/project';
import { Search, X, ArrowUpDown } from 'lucide-react';

interface TableFiltersProps {
  filters: FilterState;
  onFiltersChange: (partial: Partial<FilterState>) => void;
  totalCount: number;
  filteredCount: number;
}

const statusOptions: (ProjectStatus | 'All')[] = ['All', 'On Time', 'At Risk', 'High Risk', 'Critical'];
const typeOptions: (Project['type'] | 'All')[] = ['All', 'Commercial', 'Residential', 'Infrastructure', 'Industrial', 'Public'];

const sortOptions: { label: string; value: SortField }[] = [
  { label: 'Risk Score', value: 'riskScore' },
  { label: 'Days Late', value: 'daysLate' },
  { label: 'Budget', value: 'budget' },
  { label: 'Actual Cost', value: 'actualCost' },
  { label: 'Completion %', value: 'completionPercent' },
  { label: 'Project Name', value: 'name' },
];

export function TableFilters({ filters, onFiltersChange, totalCount, filteredCount }: TableFiltersProps) {
  const hasActiveFilters = filters.search || filters.status !== 'All' || filters.type !== 'All';

  const clearFilters = () => {
    onFiltersChange({ search: '', status: 'All', type: 'All' });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or managers…"
            value={filters.search}
            onChange={e => onFiltersChange({ search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Status filter */}
        <select
          value={filters.status}
          onChange={e => onFiltersChange({ status: e.target.value as FilterState['status'] })}
          className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer"
        >
          {statusOptions.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={filters.type}
          onChange={e => onFiltersChange({ type: e.target.value as FilterState['type'] })}
          className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer"
        >
          {typeOptions.map(t => (
            <option key={t} value={t}>{t === 'All' ? 'All Categories' : t}</option>
          ))}
        </select>

        {/* Sort Field */}
        <select
          value={filters.sortField}
          onChange={e => onFiltersChange({ sortField: e.target.value as SortField })}
          className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer"
        >
          {sortOptions.map(s => (
            <option key={s.value} value={s.value}>Sort: {s.label}</option>
          ))}
        </select>

        {/* Sort Direction Toggle */}
        <button
          onClick={() => onFiltersChange({ sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc' })}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors cursor-pointer"
          title={`Currently ${filters.sortDirection.toUpperCase()}`}
        >
          <ArrowUpDown size={14} />
          <span>{filters.sortDirection.toUpperCase()}</span>
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors font-medium cursor-pointer"
          >
            <X size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Counter summary */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-slate-700 dark:text-slate-200">{filteredCount}</strong> of {totalCount} projects</span>
        {hasActiveFilters && (
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Filtered Results Active</span>
        )}
      </div>
    </div>
  );
}
