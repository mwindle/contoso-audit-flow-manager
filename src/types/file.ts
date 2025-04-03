
export interface FileItem {
  type: 'file';
  id: string;
  name: string;
  size: number;
  lastModified: string;
  createdBy: string;
}

export interface FolderItem {
  type: 'folder';
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  children?: (FileItem | FolderItem)[];
}
