
import { Task } from './task';

export type EngagementStatus = 'draft' | 'active' | 'completed';

export interface Stakeholder {
  id: string;
  name: string;
  email: string;
  role: 'auditor' | 'client';
  permission: 'reader' | 'writer';
  avatar?: string;
}

export interface Engagement {
  id: string;
  title: string;
  description: string;
  status: EngagementStatus;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  createdBy: string;
  stakeholders: Stakeholder[];
  tasks: Task[];
}
