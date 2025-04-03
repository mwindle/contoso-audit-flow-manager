
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PlusCircle, Search } from 'lucide-react';
import EngagementCard from '@/components/engagements/EngagementCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEngagements } from '@/data/mockData';

const MyEngagements = () => {
  const { isAuditor } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter engagements
  const filteredEngagements = mockEngagements.filter(engagement => {
    const matchesSearch = engagement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engagement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || engagement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Engagements</h1>
          <p className="text-muted-foreground">View and manage your audit engagements</p>
        </div>
        {isAuditor && (
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Engagement
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search engagements..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredEngagements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEngagements.map((engagement) => (
            <EngagementCard key={engagement.id} engagement={engagement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No engagements found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default MyEngagements;
