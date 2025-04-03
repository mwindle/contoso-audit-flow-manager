
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import EngagementCard from '@/components/engagements/EngagementCard';
import { mockEngagements } from '@/data/mockData';

const RecentEngagements = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sort engagements by most recently updated
  const sortedEngagements = [...mockEngagements].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  // Filter by search term
  const filteredEngagements = sortedEngagements.filter(engagement =>
    engagement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    engagement.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recent Engagements</h1>
        <p className="text-muted-foreground">Engagements with recent activity</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recent engagements..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEngagements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEngagements.map((engagement) => (
            <EngagementCard key={engagement.id} engagement={engagement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No recent engagements found</h3>
          <p className="text-muted-foreground mt-1">Try broadening your search</p>
        </div>
      )}
    </div>
  );
};

export default RecentEngagements;
