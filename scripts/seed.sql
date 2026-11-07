-- Seed Projects
INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-001', 'Tower A - Foundations', 'Downtown, Chicago IL', 'Sarah Chen',
  'Commercial', '2024-01-15', '2025-06-30', 4200000, 3980000,
  72, 0, 'On Time', 8, 2,
  0, ARRAY['CoreDrill Pro', 'Steel Works Inc.', 'Concrete Masters']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-001
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-001-t1', 'proj-001', 'Site Preparation', 'Complete', 0, 'Tom Reid')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-001-t2', 'proj-001', 'Foundation Excavation', 'Complete', 0, 'Ana Lopez')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-001-t3', 'proj-001', 'Concrete Pouring', 'In Progress', 0, 'Mike Torres')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-001-t4', 'proj-001', 'Steel Reinforcement', 'In Progress', 0, 'Dan Park')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-001-t5', 'proj-001', 'Waterproofing', 'Not Started', 0, 'Sarah Chen')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-001
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'Jan', 500000, 480000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'Feb', 750000, 720000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'Mar', 1100000, 1050000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'Apr', 1800000, 1730000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'May', 2600000, 2510000, 4);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'Jun', 3400000, 3250000, 5);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-001', 'Jul', 4200000, 3980000, 6);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-002', 'Eastbridge Office Park', 'East Side, Houston TX', 'James Okafor',
  'Commercial', '2023-09-01', '2025-03-31', 12500000, 14375000,
  88, 12, 'High Risk', 78, 14,
  2, ARRAY['Delta Electrical', 'Premium HVAC', 'AquaPlumb', 'GlassTech Facade']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-002
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-002-t1', 'proj-002', 'Structural Frame', 'Complete', 0, 'Luis Vargas')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-002-t2', 'proj-002', 'MEP Systems', 'Delayed', 8, 'Priya Nair')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-002-t3', 'proj-002', 'Facade Installation', 'Delayed', 12, 'Kofi Asante')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-002-t4', 'proj-002', 'Interior Fit-out', 'Delayed', 5, 'Rachel Kim')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-002-t5', 'proj-002', 'Commissioning', 'Not Started', 0, 'James Okafor')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-002
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Sep', 800000, 820000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Oct', 2000000, 2150000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Nov', 3500000, 3850000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Dec', 5200000, 5900000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Jan', 7500000, 8700000, 4);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Feb', 10000000, 11800000, 5);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-002', 'Mar', 12500000, 14375000, 6);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-003', 'Riverside Residential', 'Riverside, Portland OR', 'Emily Watson',
  'Residential', '2024-03-01', '2025-08-31', 3800000, 3950000,
  55, 3, 'At Risk', 34, 5,
  0, ARRAY['NW Plumbing', 'Portland Electric', 'Cascade Roofing']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-003
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-003-t1', 'proj-003', 'Foundation', 'Complete', 0, 'Joe Marsh')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-003-t2', 'proj-003', 'Framing', 'Complete', 2, 'Sue Tran')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-003-t3', 'proj-003', 'Roofing', 'In Progress', 3, 'Bob Hill')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-003-t4', 'proj-003', 'Plumbing Rough-in', 'In Progress', 0, 'Dave Fox')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-003-t5', 'proj-003', 'Electrical Rough-in', 'Not Started', 0, 'Emily Watson')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-003
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-003', 'Mar', 300000, 310000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-003', 'Apr', 700000, 730000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-003', 'May', 1200000, 1280000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-003', 'Jun', 1900000, 2010000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-003', 'Jul', 2700000, 2870000, 4);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-003', 'Aug', 3800000, 3950000, 5);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-004', 'Municipal Parking Structure', 'City Center, Denver CO', 'Carlos Reyes',
  'Infrastructure', '2024-02-01', '2025-05-31', 6100000, 5820000,
  80, 0, 'On Time', 12, 3,
  1, ARRAY['Rocky Concrete', 'Mile High Steel', 'Summit MEP']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-004
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-004-t1', 'proj-004', 'Sub-structure', 'Complete', 0, 'Nina Rios')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-004-t2', 'proj-004', 'Level 1-3 Structure', 'Complete', 0, 'Sam Grant')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-004-t3', 'proj-004', 'Level 4-6 Structure', 'In Progress', 0, 'Ben Cruz')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-004-t4', 'proj-004', 'Electrical & Lighting', 'In Progress', 0, 'Tia Moore')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-004-t5', 'proj-004', 'Traffic Systems', 'Not Started', 0, 'Carlos Reyes')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-004
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-004', 'Feb', 600000, 570000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-004', 'Mar', 1400000, 1320000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-004', 'Apr', 2500000, 2350000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-004', 'May', 3800000, 3600000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-004', 'Jun', 5000000, 4750000, 4);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-004', 'Jul', 6100000, 5820000, 5);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-005', 'Westside Logistics Hub', 'West Industrial, Dallas TX', 'Diane Fletcher',
  'Industrial', '2023-06-01', '2024-12-31', 18000000, 18350000,
  95, 18, 'Critical', 94, 22,
  4, ARRAY['Texas Steel', 'Lone Star Electric', 'Gulf Plumbing', 'Sky Crane Services', 'Dallas HVAC']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-005
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-005-t1', 'proj-005', 'Site Grading', 'Complete', 0, 'Raj Patel')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-005-t2', 'proj-005', 'Warehouse Shell', 'Complete', 5, 'Amy Clark')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-005-t3', 'proj-005', 'Loading Docks', 'Delayed', 18, 'Tony Webb')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-005-t4', 'proj-005', 'HVAC & Fire Suppression', 'Delayed', 12, 'Kim Starr')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-005-t5', 'proj-005', 'Final Inspections', 'Not Started', 0, 'Diane Fletcher')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-005
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Jun', 1200000, 1100000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Aug', 4500000, 4200000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Oct', 8000000, 8400000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Dec', 12000000, 12800000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Feb', 15500000, 16500000, 4);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Apr', 17500000, 18100000, 5);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-005', 'Jun', 18000000, 18350000, 6);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-006', 'Harbor View Hotel', 'Waterfront, Seattle WA', 'Mia Tanaka',
  'Commercial', '2024-04-01', '2025-10-31', 22000000, 9800000,
  42, 2, 'At Risk', 22, 6,
  0, ARRAY['Pacific Steel', 'Northwest Glass', 'Harbor Electric', 'Cascade Plumbing']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-006
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-006-t1', 'proj-006', 'Foundation & Podium', 'Complete', 0, 'Greg Lam')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-006-t2', 'proj-006', 'Core & Shell Structure', 'In Progress', 2, 'Pat Ngo')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-006-t3', 'proj-006', 'Hotel Room Fit-out', 'Not Started', 0, 'Sue Banks')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-006-t4', 'proj-006', 'Restaurant & Lobby', 'Not Started', 0, 'Jake Wren')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-006-t5', 'proj-006', 'Pool & Amenities', 'Not Started', 0, 'Mia Tanaka')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-006
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-006', 'Apr', 1500000, 1480000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-006', 'May', 3200000, 3100000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-006', 'Jun', 5500000, 5300000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-006', 'Jul', 7800000, 7600000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-006', 'Aug', 10200000, 9800000, 4);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-007', 'Tech Campus Phase 1', 'Silicon Valley, San Jose CA', 'Kevin Zhao',
  'Commercial', '2023-11-01', '2025-04-30', 35000000, 37100000,
  91, 7, 'High Risk', 71, 18,
  1, ARRAY['Bay Area Steel', 'Tech MEP', 'Silicon Glass', 'Smart Systems', 'Seismic Specialists']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-007
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-007-t1', 'proj-007', 'Structural System', 'Complete', 0, 'Fiona Li')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-007-t2', 'proj-007', 'Exterior Envelope', 'Complete', 3, 'Omar Hassan')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-007-t3', 'proj-007', 'Data Center Core', 'Delayed', 7, 'Lena Park')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-007-t4', 'proj-007', 'Interior Build-out', 'Delayed', 5, 'Chris Wu')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-007-t5', 'proj-007', 'Landscaping & Parking', 'Not Started', 0, 'Kevin Zhao')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-007
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'Nov', 2500000, 2400000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'Jan', 8000000, 8200000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'Mar', 15000000, 16100000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'May', 22000000, 24000000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'Jul', 28000000, 30500000, 4);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'Sep', 32000000, 34200000, 5);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-007', 'Nov', 35000000, 37100000, 6);

INSERT INTO public.projects (
  id, name, location, manager, type, start_date, expected_end_date, budget, actual_cost,
  completion_percent, days_late, status, risk_score, change_orders, safety_incidents, subcontractors
) VALUES (
  'proj-008', 'Greenfield Elementary School', 'Greenfield, Phoenix AZ', 'Aisha Brown',
  'Public', '2024-05-01', '2025-09-30', 8500000, 4100000,
  48, 1, 'At Risk', 15, 4,
  0, ARRAY['AZ Masonry', 'Desert MEP', 'Sun Valley Roofing']::TEXT[]
) ON CONFLICT (id) DO NOTHING;

-- Tasks for proj-008
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-008-t1', 'proj-008', 'Sitework & Utilities', 'Complete', 0, 'Marcus Diaz')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-008-t2', 'proj-008', 'Foundation', 'Complete', 0, 'Jenny Ho')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-008-t3', 'proj-008', 'Structural Framing', 'In Progress', 1, 'Carl Yates')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-008-t4', 'proj-008', 'Roof & Enclosure', 'Not Started', 0, 'Dana Bell')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.project_tasks (id, project_id, name, status, days_late, assignee)
VALUES ('proj-008-t5', 'proj-008', 'Interior Classrooms', 'Not Started', 0, 'Aisha Brown')
ON CONFLICT (id) DO NOTHING;

-- Cost Trend for proj-008
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-008', 'May', 500000, 490000, 0);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-008', 'Jun', 1200000, 1180000, 1);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-008', 'Jul', 2100000, 2050000, 2);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-008', 'Aug', 3200000, 3100000, 3);
INSERT INTO public.cost_trends (project_id, month, budgeted, actual, sort_order)
VALUES ('proj-008', 'Sep', 4300000, 4100000, 4);

