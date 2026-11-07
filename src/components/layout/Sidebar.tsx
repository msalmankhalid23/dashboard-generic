import { LayoutDashboard, FolderKanban, BarChart3, Upload, Settings, ShieldAlert, Layers, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  page: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard size={19} />, page: 'dashboard' },
  { label: 'Analytics', icon: <BarChart3 size={19} />, page: 'analytics' },
  { label: 'Projects', icon: <FolderKanban size={19} />, page: 'projects' },
  { label: 'Predictive Risks', icon: <ShieldAlert size={19} />, page: 'predictive-risks' },
  { label: 'Data Upload', icon: <Upload size={19} />, page: 'upload' },
  { label: 'Settings', icon: <Settings size={19} />, page: 'settings' },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-white shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-sm shrink-0 text-white">
          <Layers size={20} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">C4Mania</span>
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
              Generic
            </span>
          </div>
          <div className="text-slate-400 text-xs font-medium">Enterprise Analytics</div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-5 space-y-1.5">
        {navItems.map(item => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={clsx(
                'w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50',
              )}
            >
              <span className={clsx(isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500')}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom User Profile Section (Matching Reference Image) */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              AC
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">Alex Chen</p>
              <p className="text-[11px] text-slate-400 truncate">Portfolio Admin</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            title="Profile & Settings"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-3">
          © 2026 C4Mania-Generic
        </p>
      </div>
    </aside>
  );
}
