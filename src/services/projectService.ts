import { supabase } from '../lib/supabase';
import type { Project, ProjectTask, CostTrendPoint } from '../types/project';

interface DbProjectRow {
  id: string;
  name: string;
  location: string;
  manager: string;
  type: Project['type'];
  start_date: string;
  expected_end_date: string;
  actual_end_date?: string | null;
  budget: number;
  actual_cost: number;
  completion_percent: number;
  days_late: number;
  status: Project['status'];
  risk_score: number;
  change_orders: number;
  safety_incidents: number;
  subcontractors: string[];
  tasks?: DbTaskRow[];
  cost_trends?: DbCostTrendRow[];
}

interface DbTaskRow {
  id: string;
  project_id: string;
  name: string;
  status: ProjectTask['status'];
  days_late: number;
  assignee: string;
}

interface DbCostTrendRow {
  id?: number;
  project_id: string;
  month: string;
  budgeted: number;
  actual: number;
  sort_order: number;
}

function mapDbToProject(row: DbProjectRow): Project {
  const tasks: ProjectTask[] = (row.tasks || []).map(t => ({
    id: t.id,
    name: t.name,
    status: t.status,
    daysLate: Number(t.days_late) || 0,
    assignee: t.assignee || '',
  }));

  const costTrend: CostTrendPoint[] = (row.cost_trends || [])
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map(c => ({
      month: c.month,
      budgeted: Number(c.budgeted) || 0,
      actual: Number(c.actual) || 0,
    }));

  return {
    id: row.id,
    name: row.name,
    location: row.location || '',
    manager: row.manager || '',
    type: row.type,
    startDate: row.start_date,
    expectedEndDate: row.expected_end_date,
    actualEndDate: row.actual_end_date || undefined,
    budget: Number(row.budget) || 0,
    actualCost: Number(row.actual_cost) || 0,
    completionPercent: Number(row.completion_percent) || 0,
    daysLate: Number(row.days_late) || 0,
    status: row.status,
    riskScore: Number(row.risk_score) || 0,
    changeOrders: Number(row.change_orders) || 0,
    safetyIncidents: Number(row.safety_incidents) || 0,
    subcontractors: Array.isArray(row.subcontractors) ? row.subcontractors : [],
    tasks,
    costTrend,
  };
}

export const projectService = {
  /**
   * Fetch all projects with their associated tasks and cost trends
   */
  async fetchProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        tasks:project_tasks(*),
        cost_trends:cost_trends(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      throw error;
    }

    return ((data || []) as unknown as DbProjectRow[]).map(mapDbToProject);
  },

  /**
   * Create a single project with tasks and cost trends
   */
  async createProject(project: Project): Promise<Project> {
    const { error: projError } = await supabase
      .from('projects')
      .upsert({
        id: project.id,
        name: project.name,
        location: project.location,
        manager: project.manager,
        type: project.type,
        start_date: project.startDate,
        expected_end_date: project.expectedEndDate,
        actual_end_date: project.actualEndDate || null,
        budget: project.budget,
        actual_cost: project.actualCost,
        completion_percent: project.completionPercent,
        days_late: project.daysLate,
        status: project.status,
        risk_score: project.riskScore,
        change_orders: project.changeOrders,
        safety_incidents: project.safetyIncidents,
        subcontractors: project.subcontractors,
        updated_at: new Date().toISOString(),
      });

    if (projError) throw projError;

    if (project.tasks && project.tasks.length > 0) {
      const taskRows = project.tasks.map(t => ({
        id: t.id.startsWith(project.id) ? t.id : `${project.id}-${t.id}`,
        project_id: project.id,
        name: t.name,
        status: t.status,
        days_late: t.daysLate,
        assignee: t.assignee,
      }));
      const { error: taskError } = await supabase.from('project_tasks').upsert(taskRows);
      if (taskError) throw taskError;
    }

    if (project.costTrend && project.costTrend.length > 0) {
      const trendRows = project.costTrend.map((c, idx) => ({
        project_id: project.id,
        month: c.month,
        budgeted: c.budgeted,
        actual: c.actual,
        sort_order: idx,
      }));
      const { error: trendError } = await supabase.from('cost_trends').insert(trendRows);
      if (trendError) throw trendError;
    }

    return project;
  },

  /**
   * Update a project's fields
   */
  async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    const dbUpdates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.manager !== undefined) dbUpdates.manager = updates.manager;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.startDate !== undefined) dbUpdates.start_date = updates.startDate;
    if (updates.expectedEndDate !== undefined) dbUpdates.expected_end_date = updates.expectedEndDate;
    if (updates.actualEndDate !== undefined) dbUpdates.actual_end_date = updates.actualEndDate;
    if (updates.budget !== undefined) dbUpdates.budget = updates.budget;
    if (updates.actualCost !== undefined) dbUpdates.actual_cost = updates.actualCost;
    if (updates.completionPercent !== undefined) dbUpdates.completion_percent = updates.completionPercent;
    if (updates.daysLate !== undefined) dbUpdates.days_late = updates.daysLate;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.riskScore !== undefined) dbUpdates.risk_score = updates.riskScore;
    if (updates.changeOrders !== undefined) dbUpdates.change_orders = updates.changeOrders;
    if (updates.safetyIncidents !== undefined) dbUpdates.safety_incidents = updates.safetyIncidents;
    if (updates.subcontractors !== undefined) dbUpdates.subcontractors = updates.subcontractors;

    const { error } = await supabase
      .from('projects')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Delete a project (cascades to tasks and cost_trends in postgres)
   */
  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Bulk insert projects (e.g. from CSV upload)
   */
  async bulkImportProjects(projects: Project[]): Promise<void> {
    for (const project of projects) {
      await this.createProject(project);
    }
  },

  /**
   * Reset database and reseed with default projects
   */
  async seedDatabase(projects: Project[]): Promise<void> {
    // Delete existing projects (which cascades to tasks & cost_trends)
    const { error: delError } = await supabase
      .from('projects')
      .delete()
      .neq('id', '');

    if (delError) throw delError;

    for (const p of projects) {
      await this.createProject(p);
    }
  },
};
