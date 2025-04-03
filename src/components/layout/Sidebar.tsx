
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClipboardList, Home, FolderOpen, Clock, PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAuditor } = useAuth();

  const navItems = [
    { 
      title: 'Dashboard', 
      icon: <Home className="h-5 w-5" />, 
      path: '/dashboard',
      active: location.pathname === '/' || location.pathname === '/dashboard',
    },
    { 
      title: 'My Engagements', 
      icon: <ClipboardList className="h-5 w-5" />, 
      path: '/my-engagements',
      active: location.pathname === '/my-engagements',
    },
    { 
      title: 'Recent Engagements', 
      icon: <Clock className="h-5 w-5" />, 
      path: '/recent-engagements',
      active: location.pathname === '/recent-engagements',
    },
  ];

  return (
    <ShadcnSidebar>
      <div className="flex h-screen flex-col border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg text-audit-blue">
            <FolderOpen className="h-6 w-6 text-audit-blue" />
            <span>Contoso Audit</span>
          </Link>
          <SidebarTrigger className="ml-auto h-8 w-8 lg:hidden" />
        </div>
        <SidebarContent>
          <div className="px-3 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-secondary",
                    item.active ? "bg-secondary text-audit-blue" : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          
          {isAuditor && (
            <div className="mt-auto p-4">
              <Button className="w-full gap-2" size="sm">
                <PlusCircle className="h-4 w-4" />
                New Engagement
              </Button>
            </div>
          )}
        </SidebarContent>
      </div>
    </ShadcnSidebar>
  );
};

export default Sidebar;
