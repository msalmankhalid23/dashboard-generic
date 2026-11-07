import type { Alert } from '../../types/project';
import { AlertTriangle, Clock, TrendingUp, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

interface AlertItemProps {
  alert: Alert;
}

const typeIcons = {
  budget: <TrendingUp size={14} />,
  delay: <Clock size={14} />,
  risk: <AlertTriangle size={14} />,
  safety: <ShieldAlert size={14} />,
};

const typeLabels = {
  budget: 'Budget',
  delay: 'Schedule',
  risk: 'Risk',
  safety: 'Quality / Flag',
};

export function AlertItem({ alert }: AlertItemProps) {
  const isCritical = alert.severity === 'critical';

  return (
    <div className={clsx(
      'flex items-start gap-3 p-3 rounded-xl border transition-colors',
      isCritical
        ? 'border-rose-200/70 bg-rose-50/70 dark:border-rose-900/40 dark:bg-rose-950/20'
        : 'border-amber-200/70 bg-amber-50/70 dark:border-amber-900/40 dark:bg-amber-950/20',
    )}>
      <div className={clsx(
        'mt-0.5 shrink-0',
        isCritical ? 'text-rose-500' : 'text-amber-500',
      )}>
        {typeIcons[alert.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className={clsx(
            'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider',
            isCritical
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
          )}>
            {isCritical ? 'Critical' : typeLabels[alert.type]}
          </span>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
            {alert.projectName}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {alert.message}
        </p>
      </div>
    </div>
  );
}
