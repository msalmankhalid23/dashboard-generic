import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Bell, Menu, X, Search, Download, Layers } from 'lucide-react';
import type { Alert } from '../../types/project';
import { AlertItem } from '../alerts/AlertItem';

interface TopBarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  alerts: Alert[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onMobileMenuOpen: () => void;
}

const pageTitles: Record<string, string> = {
  dashboard: 'Analytics Overview',
  projects: 'Projects Portfolio',
  analytics: 'Deep-Dive Analytics',
  'predictive-risks': 'Predictive Risk Intelligence',
  upload: 'Data Ingestion & Upload',
  settings: 'System & Account Settings',
};

export function TopBar({ theme, onToggleTheme, alerts, currentPage, onNavigate, onMobileMenuOpen }: TopBarProps) {
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!alertsOpen) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setAlertsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [alertsOpen]);

  const handleExportData = () => {
    onNavigate('upload');
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8 h-18 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Layers size={16} />
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-sm">C4Mania</span>
        </div>

        <div>
          <h1 className="hidden lg:block text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {pageTitles[currentPage] ?? 'Analytics Overview'}
          </h1>
          <p className="hidden lg:block text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            C4Mania-Generic Enterprise Portfolio Intelligence
          </p>
        </div>
      </div>

      {/* Right Controls (Matching InsightFlow Reference Image) */}
      <div className="flex items-center gap-3">
        {/* Search Bar Input */}
        <div className="hidden sm:flex items-center relative">
          <Search size={15} className="absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') onNavigate('projects');
            }}
            className="w-48 xl:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Alerts Bell Dropdown */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setAlertsOpen(o => !o)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="View alerts"
          >
            <Bell size={18} />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {alertsOpen && (
            <div className="absolute right-0 top-full mt-2 w-96 max-h-[70vh] flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Active Alerts</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{alerts.length} total · {criticalCount} critical</p>
                </div>
                <button
                  onClick={() => setAlertsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="overflow-y-auto p-3 space-y-2">
                {alerts.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">No active alerts</p>
                ) : (
                  alerts.map(alert => <AlertItem key={alert.id} alert={alert} />)
                )}
              </div>
            </div>
          )}
        </div>

        {/* Solid Indigo "Export Data" Button (Matching InsightFlow Reference Image) */}
        <button
          onClick={handleExportData}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl shadow-xs transition-all"
        >
          <Download size={14} />
          <span>Export Data</span>
        </button>
      </div>
    </header>
  );
}
