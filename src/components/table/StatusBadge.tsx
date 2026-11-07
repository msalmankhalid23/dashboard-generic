import type { ProjectStatus } from '../../types/project';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
  'On Time': {
    label: 'On Time',
    classes: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40',
  },
  'At Risk': {
    label: 'At Risk',
    classes: 'bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40',
  },
  'High Risk': {
    label: 'High Risk',
    classes: 'bg-orange-50 text-orange-600 border border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/40',
  },
  'Critical': {
    label: 'Critical',
    classes: 'bg-rose-50 text-rose-600 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40',
  },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig['On Time'];
  return (
    <span className={clsx(
      'inline-flex items-center font-semibold rounded-full tracking-wide shadow-2xs',
      size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
      config.classes,
    )}>
      {config.label}
    </span>
  );
}
