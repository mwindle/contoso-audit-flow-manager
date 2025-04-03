
import React, { useState } from 'react';
import { 
  File, 
  Folder, 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Edit, 
  Plus, 
  ChevronRight, 
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { FileItem, FolderItem } from '@/types/file';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FileExplorerProps {
  files: (FileItem | FolderItem)[];
  currentPath?: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  files = [], 
  currentPath = '/' 
}) => {
  const { isAuditor } = useAuth();
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path) 
        : [...prev, path]
    );
  };

  const getIcon = (item: FileItem | FolderItem) => {
    if (item.type === 'folder') return <Folder className="h-4 w-4 text-audit-blue-light" />;
    
    const extension = item.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-audit-status-cancelled" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4 text-audit-blue" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="h-4 w-4 text-audit-status-completed" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="h-4 w-4 text-audit-status-pending" />;
      default:
        return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const renderFileActions = (item: FileItem | FolderItem) => {
    const canWrite = isAuditor;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </DropdownMenuItem>
          {canWrite && (
            <>
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-audit-status-cancelled">
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderFileTree = (items: (FileItem | FolderItem)[], path: string, level = 0) => {
    return items.map(item => {
      const fullPath = `${path}/${item.name}`;
      const isExpanded = expandedFolders.includes(fullPath);
      
      if (item.type === 'folder') {
        return (
          <div key={fullPath} className="select-none">
            <div 
              className={cn(
                "group flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-secondary",
                level > 0 && "ml-4"
              )}
            >
              <button
                className="flex items-center"
                onClick={() => toggleFolder(fullPath)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              <div className="flex items-center space-x-2 flex-1">
                {getIcon(item)}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              
              {renderFileActions(item)}
            </div>
            
            {isExpanded && item.children && (
              <div className="pl-4">
                {renderFileTree(item.children, fullPath, level + 1)}
              </div>
            )}
          </div>
        );
      }
      
      return (
        <div 
          key={fullPath}
          className={cn(
            "group flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-secondary",
            level > 0 && "ml-4"
          )}
        >
          <div className="w-4"></div>
          <div className="flex items-center space-x-2 flex-1">
            {getIcon(item)}
            <span className="text-sm">{item.name}</span>
          </div>
          {renderFileActions(item)}
        </div>
      );
    });
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="border-b bg-card py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Folder className="h-5 w-5 text-audit-blue" />
          <span className="font-medium">Files</span>
        </div>
        
        {isAuditor && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="text-xs h-8 px-2">
              <Plus className="h-3.5 w-3.5 mr-1" />
              New Folder
            </Button>
            <Button size="sm" className="text-xs h-8 px-2">
              <Upload className="h-3.5 w-3.5 mr-1" />
              Upload
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-2 max-h-96 overflow-auto bg-white">
        {files.length > 0 ? (
          renderFileTree(files, currentPath)
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Folder className="h-12 w-12 mb-4 text-muted-foreground/50" />
            <h3 className="font-medium mb-1">No files yet</h3>
            <p className="text-sm">Upload files to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
