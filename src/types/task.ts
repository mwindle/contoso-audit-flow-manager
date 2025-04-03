
export type TaskStatus = 'draft' | 'pending' | 'submitted' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  engagementId: string;
  ownerId: string;
  ownerName: string;
  createdBy: string;
  fileCount?: number;
  files?: string[]; // References to file IDs associated with this task
}
