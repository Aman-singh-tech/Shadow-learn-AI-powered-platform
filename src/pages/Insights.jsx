import React from 'react';
import { Card, Button } from '../components/ui';
import { BarChart3, TrendingUp, TrendingDown, Clock, Zap, Info, ArrowUpRight, ArrowDownRight, Target, BrainCircuit, Users, Rocket } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', documented: 400, undocumented: 2400 },
  { name: 'Feb', documented: 600, undocumented: 2200 },
  { name: 'Mar', documented: 900, undocumented: 1800 },
  { name: 'Apr', documented: 1200, undocumented: 1400 },
  { name: 'May', documented: 1800, undocumented: 1000 },
];

const COLORS = ['#3b82f6', '#f43f5e', '#fbbf24', '#10b981'];

const pieData = [
  { name: 'Documented', value: 27 },
  { name: 'Undocumented', value: 73 },
];

const InsightStats = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => (
  <Card className="flex flex-col gap-6 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-50/50 rounded-bl-[100%] z-0 p-8 flex items-start justify-end transition-transform group-hover:scale-110 duration-500`}>
       <Icon size={24} className={`text-${color}-200`} />
    </div>
    <div className="relative z-10 flex flex-col items-center text-center">
       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{title}</span>
       <h3 className="text-4xl font-black tracking-tight mb-2 uppercase leading-none">{value}</h3>
       <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-wider ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trendValue}
       </div>
    </div>
  </Card>
);

const Insights = () => {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
         <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-4">Corporate Intelligence</h1>
            <p className="text-gray-500 text-lg">Measuring the hidden costs of knowledge loss and ROI of workflow capture.</p>
         </div>
         <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 text-xs font-black tracking-widest uppercase">Overview</button>
            <button className="px-6 py-2 text-gray-500 hover:text-blue-600 text-xs font-black tracking-widest uppercase">Team Detail</button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <InsightStats title="Undocumented Knowledge" value="73%" icon={BrainCircuit} trend="down" trendValue="12% vs last month" color="red" />
         <InsightStats title="Productivity Loss" value="42%" icon={TrendingDown} trend="down" trendValue="8% vs last month" color="amber" />
         <InsightStats title="Time Saved / Mo" value="120h" icon={Clock} trend="up" trendValue="24h increase" color="blue" />
         <InsightStats title="Learning Velocity" value="8.4x" icon={Rocket} trend="up" trendValue="Fastest in org" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 flex flex-col h-[450px]">
            <div className="flex justify-between items-center mb-8">
               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                     <Target size={20} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black tracking-tight uppercase leading-none">Knowledge Capture Roadmap</h3>
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Growth in items captured</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded-full" /> Verified</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-200 rounded-full" /> Backlog</span>
               </div>
            </div>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barGap={8}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                     <Tooltip 
                        contentStyle={{ border: 'none', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)', background: '#fff' }}
                        cursor={{fill: '#f8fafc'}}
                     />
                     <Bar dataKey="documented" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Documented" barSize={40} />
                     <Bar dataKey="undocumented" fill="#f1f5f9" radius={[6, 6, 0, 0]} name="Undocumented" barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="flex flex-col h-[450px]">
             <h3 className="text-xl font-black tracking-tight uppercase leading-none mb-10 text-center">Company Knowledge Map</h3>
             <div className="flex-1 w-full flex items-center justify-center relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={10}
                        dataKey="value"
                     >
                        <Cell key="cell-0" fill="#3b82f6" strokeWidth={0} />
                        <Cell key="cell-1" fill="#f1f5f9" strokeWidth={0} />
                     </Pie>
                     <Tooltip 
                        contentStyle={{ border: 'none', borderRadius: '1rem' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="text-4xl font-black text-blue-600 block leading-none">27%</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Captured</span>
               </div>
             </div>
             <div className="space-y-6 pt-10 border-t border-gray-50 uppercase font-black text-[10px] tracking-widest text-gray-400">
                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-[1.5rem]">
                   <span>Success Rate</span>
                   <span className="text-blue-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-[1.5rem]">
                   <span>Avg Search Time</span>
                   <span className="text-blue-600">2.1s</span>
                </div>
             </div>
         </Card>
      </div>

      <div className="bg-blue-600 p-10 rounded-[3rem] shadow-2xl shadow-blue-200 text-white flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 overflow-hidden relative">
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-tl-full -mr-16 -mb-16 z-0" />
         <div className="relative z-10 max-w-xl">
             <h2 className="text-3xl font-black tracking-tighter uppercase leading-none mb-4">Your brain is growing.</h2>
             <p className="text-blue-100 text-sm">You have captured 142 new items of expert knowledge this month. That's a 24% increase in team intelligence.</p>
         </div>
         <Button className="bg-white text-blue-600 hover:bg-gray-100 h-16 px-10 text-lg rounded-2xl relative z-10 shadow-xl shadow-blue-800/20 uppercase font-black tracking-widest group">
            Download Report <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>
    </div>
  );
};

export default Insights;
