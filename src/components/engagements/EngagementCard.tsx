
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, CalendarDays, CheckCircle2 } from 'lucide-react';
import { Engagement } from '@/types/engagement';

interface EngagementCardProps {
  engagement: Engagement;
}

const EngagementCard: React.FC<EngagementCardProps> = ({ engagement }) => {
  // Calculate completion percentage
  const completionPercentage = engagement.tasks
    ? Math.round((engagement.tasks.filter(task => task.status === 'completed').length / engagement.tasks.length) * 100)
    : 0;

  return (
    <Link to={`/engagement/${engagement.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{engagement.title}</CardTitle>
            <Badge variant={engagement.status === 'active' ? 'default' : 'secondary'}>
              {engagement.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground line-clamp-2">{engagement.description}</div>
          
          <div>
            <div className="flex justify-between items-center text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{engagement.stakeholders.length} Stakeholders</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>{engagement.tasks.filter(t => t.status === 'completed').length}/{engagement.tasks.length} Tasks</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1 w-full justify-between">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              <span>Created: {new Date(engagement.createdAt).toLocaleDateString()}</span>
            </div>
            {engagement.dueDate && (
              <div>
                Due: {new Date(engagement.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EngagementCard;
