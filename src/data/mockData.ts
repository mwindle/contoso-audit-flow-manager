
import { Engagement } from '@/types/engagement';
import { FolderItem, FileItem } from '@/types/file';

// Sample stakeholders
const stakeholders = [
  {
    id: '1',
    name: 'John Auditor',
    email: 'john@example.com',
    role: 'auditor',
    permission: 'writer',
    avatar: 'https://ui-avatars.com/api/?name=John+Auditor&background=1E3A8A&color=fff'
  },
  {
    id: '2',
    name: 'Jane Client',
    email: 'jane@example.com',
    role: 'client',
    permission: 'writer',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Client&background=3B82F6&color=fff'
  },
  {
    id: '3',
    name: 'Mike Manager',
    email: 'mike@example.com',
    role: 'client',
    permission: 'reader',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Manager&background=10B981&color=fff'
  },
  {
    id: '4',
    name: 'Sarah Auditor',
    email: 'sarah@example.com',
    role: 'auditor',
    permission: 'writer',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Auditor&background=F59E0B&color=fff'
  }
] as const;

// Sample tasks
const tasks = [
  {
    id: '101',
    title: 'Review financial statements',
    description: 'Perform a detailed review of all quarterly financial statements.',
    status: 'completed',
    createdAt: '2023-01-15T09:00:00Z',
    updatedAt: '2023-02-01T14:30:00Z',
    dueDate: '2023-02-15T23:59:59Z',
    engagementId: '1',
    ownerId: '2',
    ownerName: 'Jane Client',
    createdBy: '1',
    fileCount: 5
  },
  {
    id: '102',
    title: 'Prepare audit plan',
    description: 'Develop a comprehensive audit plan with scope and objectives.',
    status: 'completed',
    createdAt: '2023-01-10T10:00:00Z',
    updatedAt: '2023-01-20T11:45:00Z',
    engagementId: '1',
    ownerId: '1',
    ownerName: 'John Auditor',
    createdBy: '1',
    fileCount: 2
  },
  {
    id: '103',
    title: 'Verify asset records',
    description: 'Verify all fixed asset records and reconcile with physical inventory.',
    status: 'pending',
    createdAt: '2023-02-05T14:00:00Z',
    updatedAt: '2023-02-05T14:00:00Z',
    dueDate: '2023-03-15T23:59:59Z',
    engagementId: '1',
    ownerId: '2',
    ownerName: 'Jane Client',
    createdBy: '1',
    fileCount: 0
  },
  {
    id: '104',
    title: 'Submit tax compliance documents',
    description: 'Gather and submit all tax compliance documents for the fiscal year.',
    status: 'submitted',
    createdAt: '2023-02-10T09:30:00Z',
    updatedAt: '2023-03-01T16:15:00Z',
    dueDate: '2023-03-10T23:59:59Z',
    engagementId: '1',
    ownerId: '2',
    ownerName: 'Jane Client',
    createdBy: '1',
    fileCount: 8
  },
  {
    id: '105',
    title: 'Prepare draft audit report',
    description: 'Create the initial draft of the audit report with key findings.',
    status: 'cancelled',
    createdAt: '2023-03-01T11:00:00Z',
    updatedAt: '2023-03-05T10:30:00Z',
    engagementId: '1',
    ownerId: '4',
    ownerName: 'Sarah Auditor',
    createdBy: '1',
    fileCount: 1
  },
  {
    id: '106',
    title: 'Review internal controls',
    description: 'Perform a detailed review of internal control processes.',
    status: 'draft',
    createdAt: '2023-03-10T13:45:00Z',
    updatedAt: '2023-03-10T13:45:00Z',
    engagementId: '1',
    ownerId: '',
    ownerName: '',
    createdBy: '1',
    fileCount: 0
  }
];

// Sample engagements
export const mockEngagements: Engagement[] = [
  {
    id: '1',
    title: 'Annual Financial Audit 2023',
    description: 'Comprehensive audit of financial statements and accounting practices for the fiscal year 2023.',
    status: 'active',
    createdAt: '2023-01-01T09:00:00Z',
    updatedAt: '2023-03-15T14:30:00Z',
    dueDate: '2023-04-30T23:59:59Z',
    createdBy: '1',
    stakeholders: [stakeholders[0], stakeholders[1], stakeholders[2], stakeholders[3]],
    tasks: tasks
  },
  {
    id: '2',
    title: 'Compliance Review - Q1 2023',
    description: 'Review of regulatory compliance for Q1 2023.',
    status: 'active',
    createdAt: '2023-02-01T10:15:00Z',
    updatedAt: '2023-02-20T15:45:00Z',
    dueDate: '2023-05-15T23:59:59Z',
    createdBy: '4',
    stakeholders: [stakeholders[3], stakeholders[1]],
    tasks: [
      {
        id: '201',
        title: 'Document compliance policies',
        description: 'Review and document current compliance policies.',
        status: 'completed',
        createdAt: '2023-02-02T09:00:00Z',
        updatedAt: '2023-02-10T14:30:00Z',
        engagementId: '2',
        ownerId: '1',
        ownerName: 'John Auditor',
        createdBy: '4',
        fileCount: 3
      },
      {
        id: '202',
        title: 'Verify regulatory filings',
        description: 'Verify that all regulatory filings are up to date.',
        status: 'pending',
        createdAt: '2023-02-15T11:00:00Z',
        updatedAt: '2023-02-15T11:00:00Z',
        dueDate: '2023-03-01T23:59:59Z',
        engagementId: '2',
        ownerId: '2',
        ownerName: 'Jane Client',
        createdBy: '4',
        fileCount: 1
      }
    ]
  },
  {
    id: '3',
    title: 'IT Systems Audit',
    description: 'Audit of information technology systems and security protocols.',
    status: 'draft',
    createdAt: '2023-03-10T08:30:00Z',
    updatedAt: '2023-03-10T08:30:00Z',
    createdBy: '1',
    stakeholders: [stakeholders[0], stakeholders[2]],
    tasks: [
      {
        id: '301',
        title: 'Evaluate system access controls',
        description: 'Review and test system access controls and permissions.',
        status: 'draft',
        createdAt: '2023-03-10T09:00:00Z',
        updatedAt: '2023-03-10T09:00:00Z',
        engagementId: '3',
        ownerId: '',
        ownerName: '',
        createdBy: '1',
        fileCount: 0
      }
    ]
  },
  {
    id: '4',
    title: 'Tax Compliance Audit 2022',
    description: 'Review of tax filings and compliance for fiscal year 2022.',
    status: 'completed',
    createdAt: '2022-05-15T09:45:00Z',
    updatedAt: '2022-08-30T16:20:00Z',
    dueDate: '2022-09-01T23:59:59Z',
    createdBy: '4',
    stakeholders: [stakeholders[3], stakeholders[1], stakeholders[2]],
    tasks: [
      {
        id: '401',
        title: 'Review tax returns',
        description: 'Perform a detailed review of all tax returns.',
        status: 'completed',
        createdAt: '2022-05-16T10:00:00Z',
        updatedAt: '2022-06-01T15:30:00Z',
        dueDate: '2022-06-15T23:59:59Z',
        engagementId: '4',
        ownerId: '2',
        ownerName: 'Jane Client',
        createdBy: '4',
        fileCount: 5
      },
      {
        id: '402',
        title: 'Verify tax deductions',
        description: 'Verify that all tax deductions are properly documented.',
        status: 'completed',
        createdAt: '2022-06-20T09:30:00Z',
        updatedAt: '2022-07-10T14:15:00Z',
        dueDate: '2022-07-15T23:59:59Z',
        engagementId: '4',
        ownerId: '2',
        ownerName: 'Jane Client',
        createdBy: '4',
        fileCount: 7
      },
      {
        id: '403',
        title: 'Prepare final tax audit report',
        description: 'Create the final report detailing findings and recommendations.',
        status: 'completed',
        createdAt: '2022-07-20T11:00:00Z',
        updatedAt: '2022-08-25T16:45:00Z',
        dueDate: '2022-08-30T23:59:59Z',
        engagementId: '4',
        ownerId: '4',
        ownerName: 'Sarah Auditor',
        createdBy: '4',
        fileCount: 2
      }
    ]
  },
  {
    id: '5',
    title: 'Inventory Audit - Q2 2023',
    description: 'Physical verification of inventory and reconciliation with records.',
    status: 'active',
    createdAt: '2023-04-01T10:30:00Z',
    updatedAt: '2023-04-15T13:45:00Z',
    dueDate: '2023-06-30T23:59:59Z',
    createdBy: '1',
    stakeholders: [stakeholders[0], stakeholders[1]],
    tasks: [
      {
        id: '501',
        title: 'Plan inventory count',
        description: 'Develop a plan for conducting the physical inventory count.',
        status: 'completed',
        createdAt: '2023-04-02T09:00:00Z',
        updatedAt: '2023-04-10T15:30:00Z',
        dueDate: '2023-04-15T23:59:59Z',
        engagementId: '5',
        ownerId: '1',
        ownerName: 'John Auditor',
        createdBy: '1',
        fileCount: 1
      },
      {
        id: '502',
        title: 'Conduct physical count',
        description: 'Perform the physical inventory count according to the plan.',
        status: 'pending',
        createdAt: '2023-04-20T08:30:00Z',
        updatedAt: '2023-04-20T08:30:00Z',
        dueDate: '2023-05-10T23:59:59Z',
        engagementId: '5',
        ownerId: '2',
        ownerName: 'Jane Client',
        createdBy: '1',
        fileCount: 0
      }
    ]
  },
  {
    id: '6',
    title: 'Internal Controls Review',
    description: 'Evaluation of internal control systems and processes.',
    status: 'active',
    createdAt: '2023-03-20T09:15:00Z',
    updatedAt: '2023-04-10T14:20:00Z',
    dueDate: '2023-07-15T23:59:59Z',
    createdBy: '4',
    stakeholders: [stakeholders[3], stakeholders[2]],
    tasks: [
      {
        id: '601',
        title: 'Document control processes',
        description: 'Document current internal control processes and procedures.',
        status: 'completed',
        createdAt: '2023-03-21T10:00:00Z',
        updatedAt: '2023-04-05T16:30:00Z',
        dueDate: '2023-04-10T23:59:59Z',
        engagementId: '6',
        ownerId: '4',
        ownerName: 'Sarah Auditor',
        createdBy: '4',
        fileCount: 4
      },
      {
        id: '602',
        title: 'Test control effectiveness',
        description: 'Perform tests to evaluate the effectiveness of controls.',
        status: 'pending',
        createdAt: '2023-04-12T09:30:00Z',
        updatedAt: '2023-04-12T09:30:00Z',
        dueDate: '2023-05-20T23:59:59Z',
        engagementId: '6',
        ownerId: '3',
        ownerName: 'Mike Manager',
        createdBy: '4',
        fileCount: 1
      }
    ]
  }
];

// Sample file structure
export const mockFiles: (FileItem | FolderItem)[] = [
  {
    type: 'folder',
    id: 'f1',
    name: 'Financial Statements',
    createdAt: '2023-01-15T10:00:00Z',
    createdBy: '1',
    children: [
      {
        type: 'file',
        id: 'file1',
        name: 'Q1_Financial_Statement.pdf',
        size: 1024000,
        lastModified: '2023-01-15T14:30:00Z',
        createdBy: '2'
      },
      {
        type: 'file',
        id: 'file2',
        name: 'Q2_Financial_Statement.pdf',
        size: 980000,
        lastModified: '2023-04-10T09:15:00Z',
        createdBy: '2'
      },
      {
        type: 'file',
        id: 'file3',
        name: 'Balance_Sheet_Analysis.xlsx',
        size: 524288,
        lastModified: '2023-02-28T11:45:00Z',
        createdBy: '2'
      }
    ]
  },
  {
    type: 'folder',
    id: 'f2',
    name: 'Audit Documentation',
    createdAt: '2023-01-10T09:30:00Z',
    createdBy: '1',
    children: [
      {
        type: 'file',
        id: 'file4',
        name: 'Audit_Plan.docx',
        size: 350000,
        lastModified: '2023-01-12T15:20:00Z',
        createdBy: '1'
      },
      {
        type: 'file',
        id: 'file5',
        name: 'Risk_Assessment.pdf',
        size: 780000,
        lastModified: '2023-01-20T10:40:00Z',
        createdBy: '1'
      },
      {
        type: 'folder',
        id: 'f3',
        name: 'Working Papers',
        createdAt: '2023-02-01T08:45:00Z',
        createdBy: '1',
        children: [
          {
            type: 'file',
            id: 'file6',
            name: 'Asset_Verification.xlsx',
            size: 640000,
            lastModified: '2023-02-15T14:10:00Z',
            createdBy: '4'
          },
          {
            type: 'file',
            id: 'file7',
            name: 'Revenue_Testing.xlsx',
            size: 720000,
            lastModified: '2023-02-20T11:30:00Z',
            createdBy: '4'
          }
        ]
      }
    ]
  },
  {
    type: 'folder',
    id: 'f4',
    name: 'Tax Documents',
    createdAt: '2023-03-01T10:15:00Z',
    createdBy: '2',
    children: [
      {
        type: 'file',
        id: 'file8',
        name: 'Income_Tax_Return.pdf',
        size: 1500000,
        lastModified: '2023-03-10T09:20:00Z',
        createdBy: '2'
      },
      {
        type: 'file',
        id: 'file9',
        name: 'Property_Tax_Assessment.pdf',
        size: 890000,
        lastModified: '2023-03-15T14:50:00Z',
        createdBy: '2'
      }
    ]
  },
  {
    type: 'file',
    id: 'file10',
    name: 'Engagement_Letter.pdf',
    size: 450000,
    lastModified: '2023-01-05T09:00:00Z',
    createdBy: '1'
  },
  {
    type: 'file',
    id: 'file11',
    name: 'Client_Contact_List.xlsx',
    size: 120000,
    lastModified: '2023-01-08T11:20:00Z',
    createdBy: '1'
  }
];
