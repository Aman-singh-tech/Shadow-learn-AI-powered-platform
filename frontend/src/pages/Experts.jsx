import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { Card, Button } from '../components/ui';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  Award, 
  Code, 
  Database, 
  Layout, 
  Shield, 
  Zap, 
  Star,
  Cpu,
  Verified,
  Loader2
} from 'lucide-react';
import { mockExperts } from '../data/mockData';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SkillBadge = ({ skill }) => (
  <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-tight border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-default">
     {skill}
  </span>
);

const ExpertCard = ({ expert, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
  >
    <Card className="flex flex-col items-center text-center p-8 bg-[#0a0f1a]/60 border-white/5 hover:border-cyan-500/30 group relative overflow-hidden backdrop-blur-xl">
       {/* Background Glow */}
       <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
       
       <div className="absolute top-4 right-4 p-2 text-gray-600 hover:text-cyan-400 transition-colors cursor-pointer z-10 transition-transform hover:scale-110">
          <ExternalLink size={18} />
       </div>
       
        <div className="relative mb-8 pt-4">
           <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-cyan-600 to-indigo-500 flex items-center justify-center text-3xl font-black text-white shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:rotate-6 transition-transform duration-500 border-4 border-white/5 uppercase">
              {expert.name ? expert.name[0] : '?'}
           </div>
           <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#0a0f1a] border-4 border-[#0a0f1a] flex items-center justify-center text-emerald-500 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
              <Verified size={20} className="relative z-10" />
           </div>
        </div>

        <div className="mb-6 space-y-2">
           <h3 className="text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors uppercase italic">{expert.name || 'Anonymous Neuron'}</h3>
           <div className="flex flex-col items-center gap-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Award size={14} className="text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" /> {expert.experience || 'Neural Specialist'}
              </p>
              <div className="flex items-center gap-1 text-amber-500 mt-1">
                 <Star size={10} fill="currentColor" />
                 <Star size={10} fill="currentColor" />
                 <Star size={10} fill="currentColor" />
                 <Star size={10} fill="currentColor" />
                 <Star size={10} fill="currentColor" />
                 <span className="text-[9px] font-black text-gray-600 ml-1 uppercase tracking-widest">({expert.rating || '4.5'})</span>
              </div>
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 min-h-[60px]">
           {expert.skills?.map(skill => (
             <SkillBadge key={skill} skill={skill} />
           )) || <span className="text-[10px] text-gray-700 italic">No skills documented</span>}
        </div>

       <div className="flex w-full gap-3 mt-auto border-t border-white/5 pt-8">
          <Button onClick={() => {
             if (expert.email) {
                window.location.href = `mailto:${expert.email}`;
             } else {
                toast.error("Email terminal offline for this neural node.");
             }
          }} variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-2 h-12 border-white/10 bg-white/5 text-gray-400 hover:text-white rounded-xl uppercase font-black tracking-widest text-[9px]">
             <Mail size={16} /> Contact
          </Button>
          <Button onClick={() => toast.success(`Pinging remote neuron: ${expert.name || 'Anonymous Neuron'}`)} variant="primary" size="sm" className="flex-1 flex items-center justify-center gap-2 h-12 border-none bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.2)] uppercase font-black tracking-widest text-[9px]">
             <MessageSquare size={16} /> Signal
          </Button>
       </div>
       
       <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </Card>
  </motion.div>
);

const Experts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ENDPOINTS.USERS + '/experts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setExperts(data);
        }
      } catch (error) {
        console.error('Error fetching experts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const filteredExperts = experts.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-20 relative font-['Inter']">
       {/* Background overlays */}
       <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-10 relative z-10">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
               <Cpu size={40} />
            </div>
            <div>
               <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-white italic">
                 The Team<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-4">Neurons</span>
               </h1>
               <p className="text-gray-400 text-lg mt-2">The verified collective intelligence of our organization.</p>
            </div>
         </div>
         <div className="flex gap-3 bg-[#0a0f1a]/80 p-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md w-full md:w-auto">
            <div className="relative group w-full md:w-72">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-black" />
               <input 
                  type="text" 
                  placeholder="Query expert skills..." 
                  className="w-full pl-12 pr-4 py-3 text-sm bg-transparent border-none focus:ring-0 outline-none text-white placeholder:text-gray-700 font-black uppercase tracking-tighter"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
           <span className="text-gray-500 uppercase font-black tracking-[0.3em] text-[10px]">Accessing Neural Directory...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
           {filteredExperts.map((e, idx) => (
             <ExpertCard key={e._id} expert={e} index={idx} />
           ))}
           {filteredExperts.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-600 border border-dashed border-white/5 rounded-[3rem]">
                 <Users size={48} className="mx-auto mb-4 opacity-20" />
                 <p className="uppercase font-black tracking-widest text-xs italic">No neural nodes found matching your query.</p>
              </div>
           )}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 p-1 bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-purple-600/30 rounded-[3rem] shadow-2xl relative group overflow-hidden"
      >
         <div className="bg-[#0a0f1a]/90 backdrop-blur-3xl p-12 rounded-[2.9rem] text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-bl-full -mr-20 -mt-20 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
               <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mx-auto shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                  <Award size={40} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Promote Your Neural Node?</h3>
                  <p className="text-gray-400 text-lg leading-relaxed italic max-w-lg mx-auto">ShadowLearn automatically verifies contributors based on their operational workflow recordings and verified solution success rates.</p>
               </div>
               <Button onClick={() => toast.success("Verification request queued in system brain.")} variant="primary" className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] h-16 px-12 text-sm font-black uppercase tracking-[0.3em] rounded-2xl border-none shadow-2xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">Verify Operational Status</Button>
            </div>
         </div>
      </motion.div>
    </div>
  );
};

export default Experts;
