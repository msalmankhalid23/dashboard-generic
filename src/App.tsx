import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { PageShell } from './components/layout/PageShell';
import { useTheme } from './hooks/useTheme';
import { useProjects } from './hooks/useProjects';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Analytics } from './pages/Analytics';
import { DataUpload } from './pages/DataUpload';
import { Settings } from './pages/Settings';
import { PredictiveRisks } from './pages/PredictiveRisks';
import { X, LayoutDashboard, FolderKanban, BarChart3, Upload, Settings as SettingsIcon, ShieldAlert, Layers } from 'lucide-react';
import { clsx } from 'clsx';

type Page = 'dashboard' | 'projects' | 'analytics' | 'predictive-risks' | 'upload' | 'settings';

const mobileNavItems = [
  { label: 'Overview', icon: <LayoutDashboard size={20} />, page: 'dashboard' as Page },
  { label: 'Analytics', icon: <BarChart3 size={20} />, page: 'analytics' as Page },
  { label: 'Projects', icon: <FolderKanban size={20} />, page: 'projects' as Page },
  { label: 'Predictive Risks', icon: <ShieldAlert size={20} />, page: 'predictive-risks' as Page },
  { label: 'Data Upload', icon: <Upload size={20} />, page: 'upload' as Page },
  { label: 'Settings', icon: <SettingsIcon size={20} />, page: 'settings' as Page },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const projectsData = useProjects();

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fd] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Desktop Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={navigate} />

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={clsx(
          'lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white flex flex-col transition-transform duration-300 shadow-xl',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xs">
              <Layers size={17} />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight">C4Mania</span>
              <span className="text-[10px] ml-1 uppercase font-semibold text-indigo-600 dark:text-indigo-400">Generic</span>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {mobileNavItems.map(item => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          theme={theme}
          onToggleTheme={toggleTheme}
          alerts={projectsData.alerts}
          currentPage={currentPage}
          onNavigate={navigate}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
        />
        <PageShell>
          {projectsData.isLoading && projectsData.projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-slate-400">
              <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Loading C4Mania-Generic Intelligence...</p>
            </div>
          ) : (
            <>
              {currentPage === 'dashboard' && <Dashboard data={projectsData} onNavigate={navigate} />}
              {currentPage === 'projects' && <Projects data={projectsData} />}
              {currentPage === 'analytics' && <Analytics data={projectsData} />}
              {currentPage === 'predictive-risks' && <PredictiveRisks data={projectsData} />}
              {currentPage === 'upload' && <DataUpload data={projectsData} />}
              {currentPage === 'settings' && <Settings theme={theme} onToggleTheme={toggleTheme} data={projectsData} />}
            </>
          )}
        </PageShell>
      </div>
    </div>
  );
}
