
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Users, 
  FileText, 
  Folder 
} from 'lucide-react';
import { Engagement } from '@/types/engagement';

interface EngagementStatsProps {
  engagement: Engagement;
}

const EngagementStats: React.FC<EngagementStatsProps> = ({ engagement }) => {
  // Calculate stats
  const totalTasks = engagement.tasks.length;
  const completedTasks = engagement.tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = engagement.tasks.filter(t => t.status === 'pending').length;
  const cancelledTasks = engagement.tasks.filter(t => t.status === 'cancelled').length;
  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Sample file counts for demonstration
  const filesCount = 24;
  const foldersCount = 8;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Engagement Progress</h3>
          <span className="font-semibold text-xl">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-audit-status-completed/10 p-3">
              <CheckCircle2 className="h-6 w-6 text-audit-status-completed" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Tasks</p>
              <h3 className="text-2xl font-semibold">{completedTasks}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-audit-status-pending/10 p-3">
              <Clock className="h-6 w-6 text-audit-status-pending" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
              <h3 className="text-2xl font-semibold">{pendingTasks}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-audit-status-cancelled/10 p-3">
              <AlertCircle className="h-6 w-6 text-audit-status-cancelled" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cancelled Tasks</p>
              <h3 className="text-2xl font-semibold">{cancelledTasks}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-audit-blue/10 p-3">
              <Users className="h-6 w-6 text-audit-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stakeholders</p>
              <h3 className="text-2xl font-semibold">{engagement.stakeholders.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-audit-blue-light/10 p-3">
              <FileText className="h-6 w-6 text-audit-blue-light" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Files</p>
              <h3 className="text-2xl font-semibold">{filesCount}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-audit-blue-light/10 p-3">
              <Folder className="h-6 w-6 text-audit-blue-light" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Folders</p>
              <h3 className="text-2xl font-semibold">{foldersCount}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementStats;
