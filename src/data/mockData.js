export const mockWorkflows = [
  {
    id: 1,
    title: 'New Client Onboarding',
    description: 'Complete process for setting up a client account and CRM entry.',
    tags: ['Onboarding', 'CRM', 'Process'],
    duration: '12 min',
    recordedBy: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'SSL Certificate Renewal',
    description: 'Step-by-step renewal process for corporate web assets.',
    tags: ['Security', 'DevOps', 'Ops'],
    duration: '8 min',
    recordedBy: 'Mike Chen'
  },
  {
    id: 3,
    title: 'Troubleshooting DB Latency',
    description: 'Diagnosing common bottlenecks in Postgres clusters.',
    tags: ['Database', 'Support'],
    duration: '15 min',
    recordedBy: 'Alex Rivera'
  }
];

export const mockSolutions = [
  {
    id: 1,
    problem: 'Login Failure after v2.4 Update',
    solution: 'Incorrect cache invalidation in auth middleware. Fix: Clear browser cookies and restart session.',
    tags: ['Auth', 'Bugfix']
  },
  {
    id: 2,
    problem: 'PDF Generation Memory Leak',
    solution: 'Unclosed worker threads in the generation service. Fix: Implement proper cleanup in try/finally blocks.',
    tags: ['NodeJS', 'Performance']
  }
];

export const mockExperts = [
  { id: 1, name: 'Sarah Johnson', skills: ['Product Management', 'Strategy'], experience: 'Senior Lead' },
  { id: 2, name: 'Mike Chen', skills: ['Cloud Architecture', 'AWS', 'Kubernetes'], experience: 'Architect' },
  { id: 3, name: 'Alex Rivera', skills: ['Database Performance', 'PostgreSQL'], experience: 'Data Engineer' },
  { id: 4, name: 'Jessica Taylor', skills: ['UX Research', 'Figma', 'UI Design'], experience: 'Product Designer' }
];

export const mockInsights = {
  knowledgeGap: 73,
  productivityLoss: 42,
  timeSaved: '120h/mo',
  capturedItems: 142
};

export const mockLearningModules = [
  { id: 1, name: 'Security Essentials', steps: 5, progress: 60 },
  { id: 2, name: 'Advanced CRM Mastery', steps: 12, progress: 20 },
  { id: 3, name: 'Team Collaboration Workflow', steps: 3, progress: 100 }
];
