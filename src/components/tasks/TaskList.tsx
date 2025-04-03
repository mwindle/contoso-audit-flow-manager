
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/task';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, User, Clock, File } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskListProps {
  tasks: Task[];
  onUpdateTaskStatus?: (taskId: string, status: TaskStatus) => void;
}

const TaskStatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const statusClasses: Record<TaskStatus, string> = {
    draft: 'task-status-draft',
    pending: 'task-status-pending',
    submitted: 'task-status-submitted',
    completed: 'task-status-completed',
    cancelled: 'task-status-cancelled',
  };

  return (
    <Badge className={`${statusClasses[status]} task-status-pill`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTaskStatus }) => {
  const { user, isAuditor } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter tasks based on search term and status filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    // Hide draft tasks from non-auditors
    if (task.status === 'draft' && !isAuditor) return false;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (onUpdateTaskStatus) {
      onUpdateTaskStatus(taskId, newStatus);
    }
  };

  const getAvailableStatusTransitions = (task: Task): TaskStatus[] => {
    if (isAuditor) {
      if (task.status === 'draft') return ['pending', 'cancelled'];
      if (task.status === 'submitted') return ['completed', 'pending', 'cancelled'];
      if (task.status === 'pending') return ['cancelled'];
      return [];
    } else if (user?.id === task.ownerId) {
      if (task.status === 'pending') return ['submitted'];
      return [];
    }
    return [];
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm">Status:</span>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Files</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const availableTransitions = getAvailableStatusTransitions(task);
                
                return (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{task.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{task.ownerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {task.dueDate ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No due date</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <TaskStatusBadge status={task.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-muted-foreground" />
                        <span>{task.fileCount || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {availableTransitions.length > 0 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Update Status
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {availableTransitions.map((status) => (
                              <DropdownMenuItem 
                                key={status}
                                onClick={() => handleStatusChange(task.id, status)}
                              >
                                Set to {status.charAt(0).toUpperCase() + status.slice(1)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>
                          No Actions
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No tasks match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskList;
