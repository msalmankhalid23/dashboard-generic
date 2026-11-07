import { useState } from 'react';
import { Sun, Moon, RefreshCw, Info, Loader2, CheckCircle2 } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

type ProjectsData = ReturnType<typeof useProjects>;

interface SettingsProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  data: ProjectsData;
}

export function Settings({ theme, onToggleTheme, data }: SettingsProps) {
  const { resetData, kpis } = data;
  const [isResetting, setIsResetting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleReset = async () => {
    setIsResetting(true);
    setFeedback(null);
    try {
      await resetData();
      setFeedback('Successfully reset database to default portfolio data!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Failed to reset database.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">System & Account Settings</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Configure platform appearance, database connectivity, and environment preferences
        </p>
      </div>

      {/* Appearance */}
      <section className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Appearance Mode</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center">
              {theme === 'dark' ? (
                <Moon size={18} className="text-slate-400" />
              ) : (
                <Sun size={18} className="text-amber-500" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-[11px] text-slate-400">
                Persistent preference stored in localStorage
              </p>
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer
              ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-200'}
            `}
            role="switch"
            aria-checked={theme === 'dark'}
          >
            <span className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
              ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
            `} />
          </button>
        </div>
      </section>

      {/* Data Management */}
      <section className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Database Management</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Supabase PostgreSQL</p>
              <p className="text-[11px] text-slate-400">
                {kpis.totalProjects} active projects · {kpis.criticalProjects} critical
              </p>
            </div>
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="flex items-center gap-2 px-3.5 py-2 text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors font-semibold disabled:opacity-50 cursor-pointer"
            >
              {isResetting ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
              Reset Database to Default
            </button>
          </div>
          {feedback && (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 pt-1">
              <CheckCircle2 size={14} />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </section>

      {/* About C4Mania-Generic */}
      <section className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Info size={16} className="text-indigo-600 dark:text-indigo-400" />
          About C4Mania-Generic
        </h3>
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <p><strong className="text-slate-800 dark:text-slate-200">Platform:</strong> C4Mania-Generic Universal Analytics Dashboard</p>
          <p><strong className="text-slate-800 dark:text-slate-200">Stack:</strong> React 19 + TypeScript + Tailwind CSS v4 + Recharts + Supabase + Vite</p>
          <p><strong className="text-slate-800 dark:text-slate-200">Architecture:</strong> PostgreSQL Database with Realtime RLS + Client Risk Engine</p>
          <p><strong className="text-slate-800 dark:text-slate-200">Applicability:</strong> Construction, Enterprise Software, Engineering, Agency, Supply Chain</p>
          <p className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-700/60 mt-3">
            v2.0.0 · C4Mania-Generic Enterprise Edition
          </p>
        </div>
      </section>
    </div>
  );
}
