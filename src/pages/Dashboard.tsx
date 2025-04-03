
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import EngagementCard from '@/components/engagements/EngagementCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEngagements } from '@/data/mockData';

const Dashboard = () => {
  const { isAuditor } = useAuth();
  
  // Filter engagements - this would typically be done via API in a real app
  const myEngagements = mockEngagements.slice(0, 4); // Just taking a few for display
  const recentEngagements = [...mockEngagements].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Contoso Audit Manager</p>
        </div>
        {isAuditor && (
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Engagement
          </Button>
        )}
      </div>

      <Tabs defaultValue="my-engagements" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-engagements">My Engagements</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-engagements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {myEngagements.map((engagement) => (
              <EngagementCard key={engagement.id} engagement={engagement} />
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="mt-4">
              View All My Engagements
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentEngagements.map((engagement) => (
              <EngagementCard key={engagement.id} engagement={engagement} />
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="mt-4">
              View All Recent Engagements
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
