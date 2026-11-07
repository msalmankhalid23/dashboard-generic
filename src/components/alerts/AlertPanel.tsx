import { useState } from 'react';
import type { Alert } from '../../types/project';
import { AlertItem } from './AlertItem';
import { Bell } from 'lucide-react';

interface AlertPanelProps {
  alerts: Alert[];
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  const [showAll, setShowAll] = useState(false);
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const displayedAlerts = showAll ? alerts : alerts.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500">
            <Bell size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Operational Alerts
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {alerts.length} total flags · {criticalCount} critical
            </p>
          </div>
        </div>
        {criticalCount > 0 && (
          <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50">
            {criticalCount} critical
          </span>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mx-auto mb-3">
            <Bell size={20} className="text-emerald-500" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">All systems stable</p>
          <p className="text-xs text-slate-400">No active alerts detected across the portfolio</p>
        </div>
      ) : (
        <>
          <div className="space-y-2.5">
            {displayedAlerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
          {alerts.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3.5 w-full text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
            >
              {showAll ? 'Show less' : `Show all ${alerts.length} alerts`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
