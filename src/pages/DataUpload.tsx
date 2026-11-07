import { useRef, useState } from 'react';
import { Upload, Database, CheckCircle, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import type { Project } from '../types/project';
import { computeRiskScore, classifyStatus } from '../lib/analytics';
import { projectService } from '../services/projectService';

type ProjectsData = ReturnType<typeof useProjects>;

interface DataUploadProps {
  data: ProjectsData;
}

function parseCSV(text: string): Project[] | null {
  try {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim());
    const projects: Project[] = [];
    const timestamp = Date.now();

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(',').map(v => v.trim());
      const row: Record<string, string> = {};
      headers.forEach((h, j) => { row[h] = values[j] ?? ''; });

      const budget = Number(row.budget) || 0;
      const actualCost = Number(row.actualCost) || 0;
      const daysLate = Number(row.daysLate) || 0;

      const project: Project = {
        id: `csv-${timestamp}-${i}`,
        name: row.name || `Project ${i}`,
        location: row.location || 'Unknown',
        manager: row.manager || 'TBD',
        type: (row.type as Project['type']) || 'Commercial',
        startDate: row.startDate || new Date().toISOString().split('T')[0],
        expectedEndDate: row.expectedEndDate || new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
        budget,
        actualCost,
        completionPercent: Number(row.completionPercent) || 0,
        daysLate,
        status: classifyStatus(daysLate, budget, actualCost),
        riskScore: 0,
        tasks: [],
        costTrend: [],
        subcontractors: [],
        changeOrders: Number(row.changeOrders) || 0,
        safetyIncidents: Number(row.safetyIncidents) || 0,
      };
      project.riskScore = computeRiskScore(project);
      projects.push(project);
    }

    return projects;
  } catch {
    return null;
  }
}

const CSV_TEMPLATE = `name,location,manager,type,startDate,expectedEndDate,budget,actualCost,daysLate,completionPercent,changeOrders,safetyIncidents
Enterprise Core ERP,Headquarters NY,John Doe,Commercial,2024-01-01,2025-06-30,5000000,4800000,0,70,3,0
Client Portal V2,Remote US,Jane Smith,Residential,2024-03-01,2025-09-30,2500000,2750000,8,60,7,1`;

export function DataUpload({ data }: DataUploadProps) {
  const { resetData, refreshData, projects } = data;
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setStatus('error');
      setMessage('Please upload a .csv file');
      return;
    }
    setIsProcessing(true);
    setStatus('idle');

    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const text = e.target?.result as string;
        const parsed = parseCSV(text);
        if (!parsed || parsed.length === 0) {
          setStatus('error');
          setMessage('Could not parse CSV. Check that the format matches the template.');
          setIsProcessing(false);
          return;
        }

        await projectService.bulkImportProjects(parsed);
        await refreshData();
        setStatus('success');
        setMessage(`Successfully imported and saved ${parsed.length} projects to Supabase.`);
      } catch (err: any) {
        console.error('CSV import error:', err);
        setStatus('error');
        setMessage(err?.message || 'Failed to save projects to database.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'c4mania-generic-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReloadMock = async () => {
    setIsProcessing(true);
    setStatus('idle');
    try {
      await resetData();
      setStatus('success');
      setMessage('Default portfolio data successfully restored in Supabase.');
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Failed to reload default data in database.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Data Ingestion & Upload</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Import your own project data via CSV directly into the Supabase database or reset default data
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
          ${isDragging
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20'
            : 'border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
          }
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {isProcessing ? (
          <Loader2 size={36} className="mx-auto mb-3 text-indigo-600 animate-spin" />
        ) : (
          <Upload size={36} className="mx-auto mb-3 text-slate-400 dark:text-slate-500" />
        )}
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {isProcessing ? 'Processing & saving to Supabase...' : (
            <>Drop a CSV file here or <span className="text-indigo-600 dark:text-indigo-400">browse</span></>
          )}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Supports standard .csv format with headers
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          disabled={isProcessing}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {/* Status Alert */}
      {status !== 'idle' && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${
          status === 'success'
            ? 'border-emerald-200/80 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-300'
            : 'border-rose-200/80 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300'
        }`}>
          {status === 'success' ? <CheckCircle size={17} /> : <AlertTriangle size={17} />}
          <p className="text-xs font-semibold">{message}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold shadow-2xs cursor-pointer"
        >
          <Database size={14} />
          Download CSV Template
        </button>

        <button
          onClick={handleReloadMock}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-semibold shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          Reload Default Portfolio Data
        </button>
      </div>

      {/* Current Data Info */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-5 shadow-xs">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Current Live Supabase Dataset
        </p>
        <p className="text-sm text-slate-800 dark:text-slate-200">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{projects.length}</span> active projects loaded
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">
          Active: {projects.map(p => p.name).join(', ')}
        </p>
      </div>

      {/* CSV Format Guide */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/80 p-5 shadow-xs">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Required CSV Schema
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
          {[
            ['name', 'Project title'],
            ['location', 'Region / Department'],
            ['manager', 'Project lead / owner'],
            ['type', 'Enterprise / Commercial / Client / Public'],
            ['startDate', 'YYYY-MM-DD'],
            ['expectedEndDate', 'YYYY-MM-DD'],
            ['budget', 'Planned budget ($)'],
            ['actualCost', 'Actual cost to date ($)'],
            ['daysLate', 'Schedule variance (days)'],
            ['completionPercent', '0–100 %'],
            ['changeOrders', 'Scope / Change requests'],
            ['safetyIncidents', 'Quality / Risk flags'],
          ].map(([col, desc]) => (
            <div key={col} className="flex gap-2">
              <code className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-semibold">{col}</code>
              <span className="text-slate-500 dark:text-slate-400">— {desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
