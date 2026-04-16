import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { GraduationCap, CheckCircle, ArrowRight, BookOpen, Clock, Users, Play, Star, Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../config/api';

const ModuleCard = ({ module, index }) => {
  const progress = module.progress || 0; // Backend doesn't have progress yet, so default to 0
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="flex flex-col h-full bg-[#0a0f1a]/60 border-white/5 hover:border-indigo-500/30 transition-all duration-500 cursor-pointer relative overflow-hidden group backdrop-blur-xl group p-8 pb-10">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full z-0 p-8 flex items-start justify-end transition-transform group-hover:scale-110 duration-700 pointer-events-none" />
        
        {progress === 100 && (
          <div className="absolute top-6 right-6 text-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] z-10 transition-transform group-hover:scale-110">
             <CheckCircle size={24} fill="currentColor" className="text-emerald-500 bg-[#0a0f1a] rounded-full" />
          </div>
        )}
        
        <div className="mb-10 flex items-center justify-between relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/5">
            <BookOpen size={30} />
          </div>
          <div className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-[0.2em] shadow-sm">
             {module.workflows?.length || 0} Operational Steps
          </div>
        </div>

        <div className="space-y-4 flex-1 relative z-10">
          <h3 className="text-2xl font-black mb-2 tracking-tighter text-white group-hover:text-indigo-400 transition-colors uppercase italic leading-tight">{module.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed italic pr-4 line-clamp-2">"{module.description}"</p>
          
          <div className="flex items-center gap-6 text-[10px] font-black text-gray-600 uppercase tracking-widest pb-8 pt-4">
             <span className="flex items-center gap-2"><Clock size={14} className="text-indigo-500" /> 45m Session</span>
             <span className="flex items-center gap-2"><Users size={14} className="text-indigo-500" /> 142 Brains Active</span>
             <span className="flex items-center gap-2 text-amber-500/70"><Star size={14} fill="currentColor" /> 4.9 Rating</span>
          </div>
        </div>

        <div className="mt-auto space-y-6 pt-10 border-t border-white/5 relative z-10">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <span>Neural Encoding Progress</span>
              <span className={progress === 100 ? 'text-emerald-400' : 'text-indigo-400'}>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
               <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)] ${progress === 100 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-indigo-600 to-indigo-500'}`} 
              />
            </div>
          </div>
          <Button variant={progress === 100 ? 'secondary' : 'primary'} className={`w-full justify-between items-center group/btn h-14 rounded-2xl px-8 border-none shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
            progress === 100 
              ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-indigo-600/20'
          }`}>
             <span className="text-[11px] font-black uppercase tracking-[0.3em]">
               {progress === 100 ? 'Review Operational Path' : 'Encoded Training Session'}
             </span>
             <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const LearningModules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.MODULES, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setModules(data);
        } else {
          toast.error(data.error || 'Failed to fetch modules');
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
        toast.error('Connection error while fetching modules');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="space-y-12 pb-20 relative font-['Inter']">
       {/* Background ambient lighting */}
       <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-10 relative z-10">
        <div className="max-w-3xl">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 animate-pulse">
              <BrainCircuit size={12} /> Adaptive Learning Architecture
           </div>
           <h1 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase italic leading-none">
             Neural<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 ml-5">Operational Paths</span>
           </h1>
           <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">High-fidelity training modules autonomously curated from real-time operational recordings and verified expert solutions.</p>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 border border-white/5 p-2 px-6 rounded-2xl bg-white/5 backdrop-blur-md">
           <span className="text-gray-700">Filter Hub:</span>
           <button className="text-indigo-400 hover:text-indigo-300 transition-colors border-b border-indigo-500 pb-0.5">Recommended</button>
           <button className="hover:text-indigo-400 transition-colors">Recent Uploads</button>
           <button className="hover:text-indigo-400 transition-colors">Most Popular</button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4 text-indigo-400">
           <Loader2 size={48} className="animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Initializing Neural Paths...</p>
        </div>
      ) : modules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
          {modules.map((m, idx) => (
            <ModuleCard key={m._id} module={m} index={idx} />
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center gap-4 text-gray-600 border border-dashed border-white/5 rounded-3xl bg-white/5">
           <Sparkles size={48} className="opacity-20" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">No operational paths detected in the system brain.</p>
           <Button variant="outline" className="mt-4 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">Record First Workflow</Button>
        </div>
      )}
    </div>
  );
};

export default LearningModules;
