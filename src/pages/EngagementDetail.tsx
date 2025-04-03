
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  Users, 
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import FileExplorer from '@/components/files/FileExplorer';
import TaskList from '@/components/tasks/TaskList';
import EngagementStats from '@/components/stats/EngagementStats';
import { mockEngagements, mockFiles } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { TaskStatus } from '@/types/task';
import { useToast } from '@/hooks/use-toast';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const EngagementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuditor } = useAuth();
  const { toast } = useToast();
  
  // Get engagement data (would be fetched from API in a real app)
  const engagement = mockEngagements.find(e => e.id === id);
  
  const [tasks, setTasks] = useState(engagement?.tasks || []);

  if (!engagement) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold">Engagement not found</h2>
        <p className="text-muted-foreground mb-4">The engagement you're looking for doesn't exist or you don't have access.</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    
    toast({
      title: "Task status updated",
      description: `Task has been moved to ${newStatus} status.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{engagement.title}</h1>
          <Badge variant={engagement.status === 'active' ? 'default' : 'secondary'}>
            {engagement.status}
          </Badge>
        </div>
        
        {isAuditor && (
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Task
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EngagementStats engagement={{ ...engagement, tasks }} />
        </div>
        
        <div className="bg-card rounded-lg border p-4">
          <h3 className="font-medium mb-4">Engagement Details</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{engagement.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="text-muted-foreground">Created: </span>
                {new Date(engagement.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {engagement.dueDate && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="text-muted-foreground">Due: </span>
                  {new Date(engagement.dueDate).toLocaleDateString()}
                </div>
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Stakeholders</p>
              </div>
              
              <div className="space-y-2">
                {engagement.stakeholders.map(stakeholder => (
                  <div key={stakeholder.id} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={stakeholder.avatar} />
                      <AvatarFallback>{stakeholder.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <span>{stakeholder.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {stakeholder.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="files" className="space-y-6">
        <TabsList>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files">
          <FileExplorer files={mockFiles} />
        </TabsContent>
        
        <TabsContent value="tasks">
          <TaskList 
            tasks={tasks} 
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementDetail;
