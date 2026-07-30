import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import NewWorkflowModal from '../components/NewWorkflowModal';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import { 
  Plus, 
  Search, 
  ArrowUpRight, 
  Clock, 
  FileCheck, 
  TrendingUp,
  Activity,
  User,
  Zap,
  Loader2,
  AlertCircle
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
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="flex flex-col gap-4 bg-gray-900/40 border-gray-800 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
          <Icon size={20} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${trend >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-white font-['Outfit']">{value}</h3>
      </div>
    </Card>
  </motion.div>
);

const ActivityItem = ({ title, user, action, time }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-gray-800/40 rounded-xl transition-all duration-200 group border border-transparent hover:border-gray-700">
    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-400 shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform uppercase">
      {user[0]}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <p className="text-sm font-bold text-gray-100 truncate group-hover:text-blue-400 transition-colors uppercase italic">{title}</p>
        <span className="text-[10px] text-gray-500 shrink-0 font-medium flex items-center gap-1 uppercase">
          <Clock size={12} /> {time}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-tighter">
        <span className="font-bold text-gray-300">{user}</span> {action}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const userName = user?.name?.split(' ')[0] || 'Expert';
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.DASHBOARD + '/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setStats(data);
        } else {
          setError(data.error || 'Failed to sync neural data');
        }
      } catch (err) {
        setError('Connection interrupted. Please retry.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
     return (
       <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center gap-6">
          <div className="relative">
             <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
             <Loader2 size={64} className="animate-spin text-blue-500 relative z-10" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400/70 animate-pulse">Syncing Neural Workspace...</p>
       </div>
     );
  }

  if (error) {
     return (
       <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-red-400">
          <AlertCircle size={48} />
          <p className="font-black uppercase tracking-widest">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="border-red-500/20 hover:bg-red-500/10">Retry Sync</Button>
       </div>
     );
  }

  return (
        <>

    <div className="space-y-8 pb-10 font-['Inter'] relative">
       {/* Ambient glow */}
       <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900/40 p-10 rounded-[2.5rem] border border-gray-800 shadow-sm backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-1000"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
             <Activity size={12} /> Neural Pulse Stable
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none mb-2 font-['Outfit']">System<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 ml-4">Overview</span></h1>
          <p className="text-gray-500 font-medium tracking-tight">Accessing real-time operational metrics for Expert: <span className="text-blue-400 font-black">{userName.toUpperCase()}</span></p>
        </div>
        
        <div className="flex gap-4 mt-8 md:mt-0 relative z-10">
          <Button variant="primary" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] border-none h-14 rounded-2xl px-8 flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} className="text-white" /> 
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">New Workflow</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FileCheck} label="Captured Knowledge" value={`${stats.stats.knowledgeCaptured} units`} trend={12} />
        <StatCard icon={TrendingUp} label="Problems Solved" value={`${stats.stats.problemsSolved} issues`} trend={8.4} />
        <StatCard icon={Clock} label="Operational Time Saved" value={`${stats.stats.timeSaved} hours`} trend={24} />
        <StatCard icon={Zap} label="Global Network Experts" value={`${stats.stats.totalExperts} users`} trend={2.1} />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 flex flex-col h-[450px] bg-[#0a0f1a]/80 border-gray-800 p-10 rounded-[2.5rem] backdrop-blur-2xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Knowledge Capture Throughput</h3>
              <p className="text-2xl font-black text-white italic uppercase tracking-tighter">Mining Velocity</p>
            </div>
            <div className="p-2 bg-white/5 border border-white/5 rounded-xl">
               <TrendingUp size={24} className="text-blue-500" />
            </div>
          </div>
          <div className="flex-1 w-full -ml-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                 <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 900}} />
                <Tooltip 
                  cursor={{stroke: '#3b82f6', strokeWidth: 1}}
                  contentStyle={{ backgroundColor: '#0a0f1a', border: '1px solid #1f2937', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="flex flex-col h-[450px] bg-[#0a0f1a]/80 border-gray-800 p-10 rounded-[2.5rem] backdrop-blur-2xl">
          <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Neural Log</h3>
              <div className="p-2 bg-white/5 border border-white/5 rounded-xl">
                 <Activity size={24} className="text-blue-500" />
              </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-none no-scrollbar">
            {stats.activity.length > 0 ? (
              stats.activity.map(item => (
                <ActivityItem 
                  key={item.id}
                  title={item.title} 
                  user={userName} 
                  action={item.action} 
                  time={formatDistanceToNow(new Date(item.time), { addSuffix: true })} 
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-600 opacity-40">
                <zap size={48} />
                <p className="text-[10px] font-black uppercase tracking-widest text-center">No recent entries detected in your segment.</p>
              </div>
            )}
          </div>
          <Button variant="ghost" className="mt-6 w-full hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-blue-400 rounded-xl transition-all">Audit Global Log</Button>
        </Card>
      </div>
    </div>
    <NewWorkflowModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onCreated={(newWorkflow) => {
        // Refresh stats after creating workflow
        setLoading(true);
        setIsModalOpen(false);
      }}
    />
    </> );
};

export default Dashboard;
