import { useState, useMemo, useEffect, useCallback } from 'react';
import { portfolioData as mockProjects } from '../data/portfolioData';
import type { Project, FilterState, PredictiveRisk } from '../types/project';
import { generateAlerts, generateInsights, computeKPIs, computePredictiveRisk } from '../lib/analytics';
import { projectService } from '../services/projectService';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'All',
    type: 'All',
    sortField: 'riskScore',
    sortDirection: 'desc',
  });

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectService.fetchProjects();
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        // If table is empty, seed with initial projects
        await projectService.seedDatabase(mockProjects);
        const seeded = await projectService.fetchProjects();
        setProjects(seeded.length > 0 ? seeded : mockProjects);
      }
    } catch (err: any) {
      console.warn('Could not fetch from Supabase, falling back to mock data:', err);
      setError(err?.message || 'Database connection error');
      setProjects(mockProjects);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.manager.toLowerCase().includes(q),
      );
    }

    if (filters.status !== 'All') {
      result = result.filter(p => p.status === filters.status);
    }

    if (filters.type !== 'All') {
      result = result.filter(p => p.type === filters.type);
    }

    result.sort((a, b) => {
      const field = filters.sortField;
      const dir = filters.sortDirection === 'asc' ? 1 : -1;
      if (field === 'name') {
        return a.name.localeCompare(b.name) * dir;
      }
      return ((a[field] as number) - (b[field] as number)) * dir;
    });

    return result;
  }, [projects, filters]);

  const alerts = useMemo(() => generateAlerts(projects), [projects]);
  const insights = useMemo(() => generateInsights(projects), [projects]);
  const kpis = useMemo(() => computeKPIs(projects), [projects]);

  const predictiveRisks = useMemo(() => {
    const map: Record<string, PredictiveRisk> = {};
    for (const p of projects) {
      map[p.id] = computePredictiveRisk(p);
    }
    return map;
  }, [projects]);

  const updateFilters = (partial: Partial<FilterState>) => {
    setFilters(f => ({ ...f, ...partial }));
  };

  const resetData = useCallback(async () => {
    setIsLoading(true);
    try {
      await projectService.seedDatabase(mockProjects);
      const data = await projectService.fetchProjects();
      setProjects(data.length > 0 ? data : mockProjects);
      setError(null);
    } catch (err: any) {
      console.error('Failed to reset data in Supabase:', err);
      setError(err?.message || 'Failed to reset data');
      setProjects(mockProjects);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

  return {
    projects,
    setProjects,
    isLoading,
    error,
    refreshData,
    filteredProjects,
    filters,
    updateFilters,
    alerts,
    insights,
    kpis,
    predictiveRisks,
    resetData,
  };
}
