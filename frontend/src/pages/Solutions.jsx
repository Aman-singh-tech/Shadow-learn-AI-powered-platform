import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { 
  Lightbulb, 
  Search, 
  Filter, 
  Hash, 
  ChevronRight, 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  X,
  Zap,
  Cpu,
  Bookmark,
  Sparkles,
  Loader2,
  ExternalLink,
  Award,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const SolutionItem = ({ solution, index, onSelect }) => {
  const authorName = solution.expert?.name || 'Expert';
  const upvotes = solution.upvotes || 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onSelect(solution)}
    >
      <Card className="hover:border-amber-500/50 transition-all cursor-pointer group bg-[#0a0f1a]/60 border-white/5 backdrop-blur-xl relative overflow-hidden p-8">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-[100%] z-0 p-8 flex items-start justify-end transition-transform group-hover:scale-110 duration-500">
           <Lightbulb size={24} className="text-amber-500/20" />
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-6 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/5">
              <Zap size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl mb-2 leading-tight group-hover:text-amber-400 transition-colors uppercase tracking-tight text-white italic">{solution.title || solution.problem}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2 max-w-3xl">"{solution.content || solution.solution}"</p>
              <div className="flex flex-wrap gap-3">
                {solution.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5 group-hover:border-amber-500/20 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 text-gray-600 shrink-0 bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
            <div className="flex flex-col items-center gap-1 group/stat">
               <MessageSquare size={18} className="group-hover/stat:text-blue-400 transition-colors" />
               <span className="text-[10px] font-black uppercase tracking-widest">12</span>
            </div>
            <div className="flex flex-col items-center gap-1 group/stat text-amber-500/70">
               <ThumbsUp size={18} fill={upvotes > 0 ? "currentColor" : "none"} className="group-hover/stat:text-amber-400 transition-colors" />
               <span className="text-[10px] font-black uppercase tracking-widest">{upvotes}</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 mx-2" />
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <ChevronRight size={24} className="text-gray-700 group-hover:text-amber-400 group-hover:translate-x-2 transition-all p-1" />
            </Button>
          </div>
        </div>
        
        {/* Dynamic User Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-3 opacity-100 transition-opacity border border-white/5 bg-[#0a0f1a]/80 px-4 py-1.5 rounded-full backdrop-blur-md">
           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Verified Export: <span className="text-amber-400 italic">"{authorName}"</span></span>
        </div>
      </Card>
    </motion.div>
  );
};

const Solutions = () => {
  const { user } = useAuth();
  const [solutions, setSolutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(API_ENDPOINTS.SOLUTIONS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSolutions(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredSolutions = solutions.filter(s => 
    (s.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddSolution = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    const tagsStr = e.target[2].value;

    if (!title || !content) {
      toast.error('Title and Solution context are required');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_ENDPOINTS.SOLUTIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title, 
          content, 
          tags: tagsStr.split(',').map(t => t.trim()).filter(Boolean) 
        })
      });

      if (res.ok) {
        toast.success('Solution permanently anchored in repository');
        setIsModalOpen(false);
        fetchSolutions(); 
      } else {
        toast.error('Repository synchronization failed');
      }
    } catch (err) {
      toast.error('Network error during commit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 relative font-['Inter']">
       {/* Ambient backgrounds */}
       <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="bg-[#0a0f1a]/40 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl text-center relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-[5px] h-full bg-gradient-to-b from-amber-500 to-amber-600/20" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6">
             <Sparkles size={12} /> Expert-Verified Repository
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase italic text-center">
            Solution<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 ml-4">Engine</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed text-center italic opacity-80">Access the collective intelligence of top engineers. Verified fixes for production critical infrastructure.</p>
          
          <div className="mt-12 relative max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Search solutions... e.g. 'Postgres memory leak' or 'JWT validation'" 
                  className="w-full pl-16 pr-6 py-5 bg-[#030810]/60 border border-white/10 rounded-2xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 outline-none transition-all font-medium text-white shadow-2xl shadow-black/40 placeholder:text-gray-700 uppercase italic tracking-tighter"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="primary" className="px-10 h-[68px] rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)] text-sm font-black uppercase tracking-[0.2em] border-none bg-gradient-to-r from-amber-600 to-amber-500">Query Engine</Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2 mr-2">Neural Shortcuts:</span>
              {['DevOps', 'Frontend', 'Cloud-Scale', 'Security'].map(tag => (
                <button 
                key={tag} 
                className="text-[10px] font-black px-4 py-1.5 bg-white/5 border border-white/5 rounded-full hover:border-amber-500/30 text-gray-500 hover:text-amber-400 transition-all uppercase tracking-widest"
                onClick={() => setSearchTerm(tag)}
                >#{tag}</button>
              ))}
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-[10px] font-black px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <X size={12} /> Clear Filter
                </button>
              )}
            </div>
            
            <div className="flex justify-center mt-10">
              <Button onClick={() => setIsModalOpen(true)} variant="outline" className="flex items-center gap-3 px-10 py-4 border-white/10 text-gray-400 hover:text-amber-400 hover:bg-amber-500/5 rounded-2xl h-14 uppercase font-black tracking-widest text-xs transition-all italic">
                <Plus size={20} /> Deploy Solution Node
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
              <span className="text-gray-500 uppercase font-black tracking-[0.3em] text-[10px]">Syncing Knowledge Nodes...</span>
           </div>
        ) : (
          <>
            {filteredSolutions.map((s, idx) => (
              <SolutionItem key={s._id || s.id} solution={s} index={idx} onSelect={setSelectedSolution} />
            ))}
            {filteredSolutions.length === 0 && (
              <div className="text-center py-40 bg-[#0a0f1a]/40 rounded-[3.5rem] border border-dashed border-white/5">
                <Bookmark className="w-16 h-16 text-gray-800 mx-auto mb-6 opacity-20" />
                <p className="text-gray-500 uppercase font-black tracking-widest mb-1 text-sm italic">Knowledge Repository Empty</p>
                <p className="text-gray-600 text-xs text-center max-w-xs mx-auto px-4">The expert brain contains no verified solutions for this sector yet. Be the first to anchor a fix.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal - Solution Details */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSolution(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0f1a] rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-white/10 overflow-hidden"
            >
              <div className="p-10 pb-8 bg-gradient-to-br from-amber-600/20 to-transparent border-b border-white/5 flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-lg shadow-amber-500/5">
                     <Zap size={30} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">{selectedSolution.title || selectedSolution.problem}</h2>
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                       <Award size={14} className="text-amber-500" /> Verified Fix Protocol • Contributed by {selectedSolution.expert?.name || 'Expert Contributor'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSolution(null)}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 space-y-10 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Problem Specification</h4>
                   </div>
                  <p className="text-white text-xl font-bold leading-relaxed italic pr-4">"{selectedSolution.title || selectedSolution.problem}"</p>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-cyan-500 rounded-full" />
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Solution Protocol (Anchored Logic)</h4>
                   </div>
                  <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 relative group">
                     <div className="absolute top-4 right-4 text-gray-800 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Cpu size={40} />
                     </div>
                     <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">{selectedSolution.content || selectedSolution.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] w-full mb-2">Neural Connectors:</span>
                  {selectedSolution.tags?.map(tag => (
                    <span key={tag} className="px-5 py-2 bg-amber-500/5 text-amber-400/70 border border-amber-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                       #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 flex gap-4 border-t border-white/5 bg-white/2">
                <Button className="flex-1 h-16 rounded-2xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 uppercase font-black tracking-[0.3em] flex items-center justify-center gap-3 border-white/5">
                   <ThumbsUp size={18} /> Endorse Solution
                </Button>
                <Button 
                  onClick={() => {
                    toast.success("Protocol exported to clipboard");
                    setSelectedSolution(null);
                  }}
                  className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-amber-600/20 border-none flex items-center justify-center gap-3"
                >
                  <ExternalLink size={18} /> Mirror Protocol
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal - Deploy Solution Node */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0f1a] rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.8)] p-0 w-full max-w-xl border border-white/10 overflow-hidden"
            >
              <div className="flex justify-between items-start text-white p-10 pt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-500 opacity-90 z-0"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter italic leading-none">New Expert Fix</h2>
                  <p className="text-amber-50 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Anchoring verified knowledge in the brain</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                  <X size={28} />
                </button>
              </div>
              
              <form onSubmit={handleAddSolution} className="p-10 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">Problem Specification</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 outline-none transition-all placeholder:text-gray-700" 
                    placeholder="e.g. JWT Token Refresh Mechanism" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">Solution Protocol (Context)</label>
                  <textarea 
                    rows="4" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 outline-none transition-all placeholder:text-gray-700 resize-none" 
                    placeholder="Describe the exact fix protocol..." 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">Neural Connectors (Tags)</label>
                  <div className="relative">
                    <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 font-black" size={16} />
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 outline-none transition-all placeholder:text-gray-700" 
                      placeholder="React, Node, Security" 
                    />
                  </div>
                </div>
                <Button type="submit" variant="primary" className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/20 rounded-[1.5rem] border-none bg-gradient-to-r from-amber-600 to-amber-500 mt-4 h-16 flex justify-center items-center">
                   {loading ? <Loader2 size={24} className="animate-spin" /> : 'Synchronize with Hub'}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Solutions;

