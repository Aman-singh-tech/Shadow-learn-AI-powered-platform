import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { API_ENDPOINTS } from '../config/api';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Zap, 
  Info, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight,
  Target, 
  BrainCircuit, 
  Users, 
  Rocket,
  ShieldCheck,
  Activity,
  Loader2
} from 'lucide-react';
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
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', documented: 400, undocumented: 2400 },
  { name: 'Feb', documented: 600, undocumented: 2200 },
  { name: 'Mar', documented: 900, undocumented: 1800 },
  { name: 'Apr', documented: 1200, undocumented: 1400 },
  { name: 'May', documented: 1800, undocumented: 1000 },
];

const COLORS = ['#22d3ee', '#8b5cf6', '#f59e0b', '#10b981'];

const pieData = [
  { name: 'Documented', value: 27 },
  { name: 'Undocumented', value: 73 },
];

const InsightStats = ({ title, value, icon: Icon, trend, trendValue, color = "cyan" }) => (
  <Card className="flex flex-col gap-6 relative overflow-hidden group border-white/5 bg-[#0a0f1a]/60 backdrop-blur-xl">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 rounded-bl-[100%] z-0 p-8 flex items-start justify-end transition-transform group-hover:scale-110 duration-500`}>
       <Icon size={24} className={`text-${color}-400/30`} />
    </div>
    <div className="relative z-10 flex flex-col items-center text-center">
       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{title}</span>
       <h3 className={`text-4xl font-black tracking-tight mb-2 uppercase leading-none text-white group-hover:text-${color}-400 transition-colors`}>{value}</h3>
       <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-wider ${trend === 'up' ? 'text-green-400' : 'text-rose-400'}`}>
         { trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trendValue}
       </div>
    </div>
    {/* Bottom Glow */}
    <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
  </Card>
);

const Insights = () => {
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.INSIGHTS, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setInsightData(data);
        }
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-60 gap-4">
         <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
         <span className="text-gray-500 uppercase font-black tracking-[0.3em] text-[10px]">Aggregating Organizational Intelligence...</span>
      </div>
    );
  }

  const { stats, chartData, pieData } = insightData || {
    stats: { undocumentedKnowledge: '0%', productivityLoss: '0%', timeSaved: '0h', learningVelocity: '1.0x' },
    chartData: [],
    pieData: [{ name: 'Documented', value: 0 }, { name: 'Undocumented', value: 100 }]
  };

  return (
    <div className="space-y-8 pb-20 relative font-['Inter']">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8 relative z-10">
         <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-4 text-white">
              Corporate<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-3">Intelligence</span>
            </h1>
            <p className="text-gray-400 text-lg">Measuring the hidden costs of knowledge loss and ROI of workflow capture.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
         <InsightStats title="Undocumented Knowledge" value={stats.undocumentedKnowledge} icon={BrainCircuit} trend="down" trendValue="Scanning organization..." color="rose" />
         <InsightStats title="Productivity Risk" value={stats.productivityLoss} icon={TrendingDown} trend="down" trendValue="Based on backlog" color="amber" />
         <InsightStats title="Time Saved / Mo" value={stats.timeSaved} icon={Clock} trend="up" trendValue="Cumulative count" color="cyan" />
         <InsightStats title="Learning Velocity" value={stats.learningVelocity} icon={Rocket} trend="up" trendValue="Fastest in org" color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
         <Card className="lg:col-span-2 flex flex-col h-[450px] border-white/5 bg-[#0a0f1a]/60 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-8">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                     <Target size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black tracking-tight uppercase leading-none text-white">Knowledge Capture Roadmap</h3>
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Growth in mission-critical items captured</span>
                  </div>
               </div>
            </div>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={8}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 900}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 900}} />
                     <Tooltip 
                        contentStyle={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', background: '#0a0f1a', color: '#fff' }}
                        cursor={{fill: 'rgba(255,255,255,0.02)'}}
                        itemStyle={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                     />
                     <Bar dataKey="documented" fill="#22d3ee" radius={[6, 6, 0, 0]} name="Documented" barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="flex flex-col h-[450px] border-white/5 bg-[#0a0f1a]/60 backdrop-blur-xl group">
             <h3 className="text-xl font-black tracking-tight uppercase leading-none mb-10 text-center text-white">Company Knowledge Map</h3>
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
                        <Cell key="cell-0" fill="#22d3ee" strokeWidth={0} className="filter drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                        <Cell key="cell-1" fill="rgba(255,255,255,0.05)" strokeWidth={0} />
                     </Pie>
                     <Tooltip 
                        contentStyle={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', background: '#0a0f1a' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="text-4xl font-black text-cyan-400 block leading-none filter drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">{pieData[0].value}%</span>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Captured</span>
               </div>
             </div>
             <div className="space-y-4 pt-10 border-t border-white/5 uppercase font-black text-[10px] tracking-widest text-gray-400">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-[1.5rem] border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                   <span>Sync Rate</span>
                   <span className="text-cyan-400">98.4%</span>
                </div>
             </div>
         </Card>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 p-1 rounded-[3rem] shadow-2xl relative overflow-hidden group"
      >
         <div className="bg-[#0a0f1a]/80 backdrop-blur-3xl rounded-[2.9rem] p-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-tl-full -mr-16 -mb-16 z-0" />
            <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl font-black tracking-tighter uppercase leading-none mb-4 text-white">
                  Your brain is<span className="text-cyan-400 ml-3">growing.</span>
                </h2>
                <p className="text-gray-400 text-sm">ShadowLearn has aggregated all verified workflows. The organization's collective intelligence index is synchronized.</p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] h-16 px-10 text-lg rounded-2xl relative z-10 uppercase font-black tracking-widest group border-none">
               Export Global Report <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
         </div>
      </motion.div>
    </div>
  );
};

export default Insights;
