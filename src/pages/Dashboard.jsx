import React from 'react';
import { Card, Button } from '../components/ui';
import { 
  Plus, 
  Search, 
  ArrowUpRight, 
  Clock, 
  FileCheck, 
  TrendingUp,
  Activity,
  User,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 18 },
  { name: 'Wed', count: 24 },
  { name: 'Thu', count: 15 },
  { name: 'Fri', count: 32 },
  { name: 'Sat', count: 42 },
  { name: 'Sun', count: 50 },
];

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <Card className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </Card>
);

const ActivityItem = ({ title, user, action, time }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 shrink-0">
      {user[0]}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <p className="text-sm font-bold text-gray-900 truncate">{title}</p>
        <span className="text-xs text-gray-400 shrink-0 flex items-center gap-1">
          <Clock size={12} /> {time}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-0.5">
        <span className="font-medium text-gray-700">{user}</span> {action}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-gray-500">Welcome back, Sarah. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Search size={18} /> Search
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} /> New Workflow
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FileCheck} label="Knowledge Captured" value="1,242 items" trend={12} />
        <StatCard icon={TrendingUp} label="Problems Solved" value="854 issues" trend={8.4} />
        <StatCard icon={Clock} label="Time Saved" value="120 hrs/mo" trend={24} />
        <StatCard icon={Zap} label="Daily Active Brains" value="42 experts" trend={-2} />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" /> Knowledge Mining Velocity
            </h3>
            <select className="text-sm border-none bg-transparent font-medium text-gray-500 focus:ring-0 cursor-pointer">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                 <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="flex flex-col h-[400px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> Recent Activity
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            <ActivityItem title="New Client Onboarding" user="Sarah J." action="recorded a workflow" time="2m ago" />
            <ActivityItem title="Login Failure v2.4 fix" user="Mike Chen" action="logged a solution" time="45m ago" />
            <ActivityItem title="SSL Renewal Guide" user="Alex R." action="updated a module" time="2h ago" />
            <ActivityItem title="React Hooks mastery" user="Jessica T." action="started a module" time="4h ago" />
            <ActivityItem title="Docker Debugging" user="Admin" action="approved a handoff" time="Yesterday" />
          </div>
          <Button variant="ghost" className="mt-4 w-full">View all activity</Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
