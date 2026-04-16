import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../config/api';
import { 
  RefreshCw, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Shield, 
  Database, 
  Video, 
  BookOpen, 
  UserPlus, 
  Info,
  ChevronRight,
  Target,
  Zap,
  Plus,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ChecklistItem = ({ title, icon: Icon, description, status, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-5 p-6 bg-[#0a0f1a]/60 border border-white/5 hover:border-blue-500/30 rounded-[2rem] backdrop-blur-xl transition-all group relative overflow-hidden"
  >
    <div className={`mt-1 h-7 w-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
      status === 'complete' ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'border-gray-700 bg-black/40 group-hover:border-blue-500/50'
    }`}>
      {status === 'complete' ? <CheckCircle2 size={16} fill="currentColor" className="text-white" /> : <Circle size={16} className="text-gray-700" />}
    </div>
    <div className="flex-1 relative z-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
        <h3 className={`text-xl font-black tracking-tight transition-colors italic uppercase leading-none ${status === 'complete' ? 'text-gray-600 line-through' : 'text-white'}`}>
          {title}
        </h3>
        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border self-start ${
          status === 'complete' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
        }`}>
          {status === 'complete' ? 'Protocol Synchronized' : 'Awaiting Handoff'}
        </span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed italic max-w-2xl">"{description}"</p>
      
      {status === 'pending' && (
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" size="sm" className="h-10 px-6 text-[10px] font-black uppercase tracking-[0.2em] bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all rounded-xl gap-2">
            <Icon size={14} /> Execute Node
          </Button>
          <Button variant="ghost" size="sm" className="h-10 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-all gap-2">
             <Info size={14} /> Documentation
          </Button>
        </div>
      )}
    </div>
    
    {/* Subtle status glow */}
    {status === 'pending' && (
       <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
    )}
  </motion.div>
);

const Handoffs = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('offboarding');
  const [handoffs, setHandoffs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchHandoffs();
  }, []);

  const fetchHandoffs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(API_ENDPOINTS.HANDOFFS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHandoffs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_ENDPOINTS.HANDOFFS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'completed', completedAt: new Date() })
      });

      if (res.ok) {
        toast.success('Protocol Synchronized');
        fetchHandoffs();
      }
    } catch (err) {
      toast.error('Sync failed');
    }
  };
  
  const displayList = handoffs.map(h => ({
    id: h._id,
    title: `Task Node: ${h.workflow?.title || "Operational Node"}`,
    description: h.notes || `Designated by ${h.assignedBy?.name || 'Central Brain'}`,
    icon: Database,
    status: h.status === 'completed' ? 'complete' : 'pending'
  }));

  return (
    <div className="space-y-10 pb-20 relative font-['Inter']">
       {/* Ambient backgrounds */}
       <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="bg-[#0a0f1a]/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md flex flex-col items-center text-center">
         <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-bl-full z-0 p-12 flex items-end justify-end pointer-events-none">
            <RefreshCw size={48} className="text-blue-500/20 animate-spin" style={{ animationDuration: '8s' }} />
         </div>
         
         <div className="relative z-10 max-w-3xl mx-auto space-y-6 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
               <Target size={12} className="animate-pulse" /> Precision Succession Engine
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none italic text-white leading-[0.85] text-center">
              Handoff<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 ml-4">Architecture</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto text-center opacity-80">AI-orchestrated checklists and workflow anchoring for zero-loss role transitions. Seamlessly transfer expert context.</p>
            
            <div className="w-full h-2 bg-white/5 rounded-full mt-12 overflow-hidden border border-white/5 p-[1px]">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "27%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
               />
            </div>
            <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-2">
               <span className="text-blue-400">Operational Log Active</span>
               <span>Target Node: Friday 24th</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 relative z-10">
         <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#0a0f1a]/40 p-2 rounded-3xl border border-white/5 backdrop-blur-md">
               {[
                 { id: 'offboarding', label: 'My Inbox' },
                 { id: 'onboarding', label: 'Delegated Tasks' },
                 { id: 'project', label: 'History' }
               ].map((tab) => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`w-full text-left px-6 py-4 rounded-2xl flex items-center justify-between transition-all font-black uppercase tracking-widest text-[10px] mb-2 last:mb-0 ${
                     activeTab === tab.id 
                       ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-500/20' 
                       : 'bg-transparent text-gray-500 hover:bg-white/5'
                   }`}
                 >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={16} />}
                 </button>
               ))}
            </div>
            
            <Card className="p-6 bg-[#0a0f1a]/60 border-white/5 text-center flex flex-col items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                  <Zap size={24} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Next Action Required</p>
               <p className="text-xs font-bold text-white leading-relaxed italic uppercase tracking-tighter">"Synchronize all pending handoffs before next segment node."</p>
            </Card>
         </div>

         <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
               {loading ? (
                  <div className="flex flex-col items-center justify-center py-40 gap-4">
                     <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                     <span className="text-gray-500 uppercase font-black tracking-[0.3em] text-[10px]">Retrieving Protocol Checklists...</span>
                  </div>
               ) : (
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                 >
                    {displayList.length > 0 ? displayList.map((item, idx) => (
                      <div key={item.id} onClick={() => item.status === 'pending' && handleCompleteTask(item.id)}>
                         <ChecklistItem {...item} index={idx} />
                      </div>
                    )) : (
                      <div className="py-20 text-center text-gray-600 border border-dashed border-white/5 rounded-[2.5rem]">
                         <Info size={40} className="mx-auto mb-4 opacity-20" />
                         <p className="uppercase font-black text-[10px] tracking-widest italic">All neural nodes are synchronized for this sector.</p>
                      </div>
                    )}
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

export default Handoffs;
