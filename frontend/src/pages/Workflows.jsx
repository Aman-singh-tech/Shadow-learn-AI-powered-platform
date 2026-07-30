import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { 
  Video, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  MoreVertical, 
  X, 
  CheckCircle, 
  Clock,
  LayoutGrid,
  List,
  UploadCloud,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

const WorkflowCard = ({ workflow, onPlay }) => (
  <Card className="group relative border-white/5 bg-[#0a0f1a]/60 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
    <div className="absolute top-4 right-4 text-gray-600 group-hover:text-cyan-400 transition-colors cursor-pointer z-10">
      <MoreVertical size={20} />
    </div>
    
    {/* Preview Image / Placeholder */}
    <div className="relative aspect-video bg-black/40 mb-4 overflow-hidden rounded-xl border border-white/5">
       <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
          <Video className="w-12 h-12 text-white/5" />
       </div>
       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-60"></div>
       <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
         {workflow.duration || '0:00'}
       </div>
    </div>
    
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg mb-1 truncate text-white group-hover:text-cyan-400 transition-colors">{workflow.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10">{workflow.description}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-6 h-7 overflow-hidden">
      {workflow.tags && workflow.tags.map(tag => (
        <span key={tag} className="px-2 py-0.5 bg-cyan-500/5 text-cyan-400/70 rounded border border-cyan-500/10 text-[10px] font-bold uppercase tracking-tight">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-purple-500/10">
          {(workflow.recordedBy || 'E')[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-300 leading-none">{workflow.recordedBy || 'Expert'}</span>
          <span className="text-[9px] uppercase tracking-widest text-gray-600 mt-1">Contributor</span>
        </div>
      </div>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => onPlay(workflow)}
        className="flex items-center gap-2 h-9 text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-4 hover:bg-cyan-500/10 transition-all group/play"
      >
        <Play size={14} fill="currentColor" className="group-hover/play:scale-120 transition-transform" /> 
        <span className="text-xs font-black uppercase tracking-widest">Open</span>
      </Button>
    </div>
  </Card>
);

const Workflows = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingWorkflow, setPlayingWorkflow] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(API_ENDPOINTS.WORKFLOWS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setWorkflows(data);
      }
    } catch (error) {
      console.error("Failed to fetch workflows", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    
    if (!title) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Inject recordedBy using current user name
      formData.append('recordedBy', user?.name || 'Expert');
      
      const res = await fetch(API_ENDPOINTS.WORKFLOWS, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setWorkflows([data, ...workflows]);
        toast.success('Workflow successfully anchored to vault');
        setIsModalOpen(false);
      } else {
        toast.error('Vault synchronization failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error during upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 relative font-['Inter']">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0a0f1a]/40 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-bl-full z-0 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-white uppercase">
            Knowledge<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 ml-3">Vault</span>
          </h1>
          <p className="text-gray-400 text-lg">Central nervous system for expert recordings and process documentation.</p>
        </div>
        <div className="flex gap-3 relative z-10">
          <Button onClick={() => setIsModalOpen(true)} variant="primary" className="flex items-center gap-3 shadow-xl shadow-cyan-500/20 rounded-2xl h-14 px-8 group border-none bg-gradient-to-r from-cyan-600 to-cyan-500">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            <span className="font-black uppercase tracking-widest text-sm">Add Workflow</span>
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between relative z-10">
        <div className="relative flex-1 w-full max-w-xl">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold" />
          <input 
            type="text" 
            placeholder="Search the collective memory..." 
            className="w-full pl-12 pr-4 py-4 bg-[#0a0f1a]/80 border border-white/10 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 outline-none text-white transition-all shadow-xl shadow-black/20 placeholder:text-gray-600"
          />
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <Button variant="outline" className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 border-white/10 bg-[#0a0f1a]/40 hover:bg-white/5 rounded-2xl text-gray-400 uppercase font-black tracking-widest text-xs h-14">
            <Filter size={18} /> Filters
          </Button>
          <div className="flex rounded-2xl bg-[#0a0f1a] border border-white/10 p-1.5 h-14 items-center">
            <button className="px-4 py-2 bg-gradient-to-br from-cyan-600 to-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <LayoutGrid size={16} /> Grid
            </button>
            <button className="px-4 py-2 text-gray-500 text-xs font-black uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center gap-2">
              <List size={16} /> List
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
           <span className="text-gray-500 uppercase font-black tracking-[0.3em] text-[10px]">Accessing Vault...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {workflows.map((workflow, idx) => (
              <motion.div
                key={workflow._id || workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <WorkflowCard workflow={workflow} onPlay={setPlayingWorkflow} />
              </motion.div>
            ))}
          </AnimatePresence>
          {workflows.length === 0 && (
            <div className="col-span-full py-40 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
               <Video className="w-16 h-16 text-gray-700 mx-auto mb-6 opacity-20" />
               <p className="text-gray-500 uppercase font-black tracking-widest mb-1 text-sm">No knowledge documented yet</p>
               <p className="text-gray-600 text-xs">Start building the company's brain by recording your first workflow.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal - Document New Knowledge */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0f1a] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-0 w-full max-w-xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex-shrink-0 flex justify-between items-start text-white p-10 pt-12 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-500 opacity-90 z-0"></div>
                 <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2 uppercase tracking-tight leading-none italic">Capture Intelligence</h2>
                    <p className="text-cyan-50 text-xs font-bold uppercase tracking-widest opacity-80">Anchoring expert workflows into the vault</p>
                 </div>
                 <button 
                  onClick={() => setIsModalOpen(false)}
                  className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-10 pb-10 pt-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Workflow Title</label>
                    <input 
                      name="title"
                      type="text" 
                      required
                      placeholder="e.g. Setting up a new Postgres cluster" 
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 outline-none text-white transition-all placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Contextual Summary</label>
                    <textarea 
                      name="description"
                      rows="3"
                      placeholder="Briefly bridge the knowledge gap..." 
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 outline-none text-white transition-all placeholder:text-gray-700 resize-none"
                    />
                  </div>
                  
                  <div className="group relative">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">Source Media (Video)</label>
                     <div className="relative overflow-hidden bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-cyan-500/30 transition-all p-8 text-center flex flex-col items-center gap-3">
                        <UploadCloud className="w-10 h-10 text-gray-700 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                        <div>
                          <p className="text-xs font-bold text-gray-400">Click to upload or drag & drop</p>
                          <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest font-black">MP4, MOV up to 500MB</p>
                        </div>
                        <input 
                          name="video"
                          type="file" 
                          accept="video/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] ml-1">Metadata Tags</label>
                      <input 
                        name="tags"
                        type="text" 
                        placeholder="DevOps, Security" 
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 outline-none text-white transition-all placeholder:text-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] ml-1">Recorded By</label>
                      <div className="w-full px-5 py-4 bg-white/5 border border-white/5 text-gray-500 rounded-2xl font-bold italic">
                         {user?.name || 'Local Expert'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <Button type="submit" variant="primary" className="w-full py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-cyan-500/20 rounded-[1.5rem] border-none bg-gradient-to-r from-cyan-600 to-cyan-500 flex justify-center items-center">
                      {loading ? <Loader2 size={24} className="animate-spin" /> : 'Synchronize with Vault'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Knowledge Node - Player */}
      <AnimatePresence>
        {playingWorkflow && (
           <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setPlayingWorkflow(null)}
               className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="relative bg-[#0a0f1a] rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-4xl border border-white/10 overflow-hidden"
             >
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0f1a] absolute top-0 left-0 right-0 z-10 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                       <Video size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight truncate max-w-md">{playingWorkflow.title}</h3>
                  </div>
                  <button 
                    onClick={() => setPlayingWorkflow(null)}
                    className="p-2 hover:bg-white/5 text-gray-500 hover:text-white rounded-full transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>
                <div className="aspect-video w-full bg-black flex items-center justify-center mt-[88px]">
                   {playingWorkflow.videoUrl ? (
                     <video 
                       controls 
                       autoPlay 
                       className="w-full h-full shadow-2xl shadow-cyan-500/10"
                       src={`${API_BASE_URL}${playingWorkflow.videoUrl}`}
                     />
                   ) : (
                     <div className="text-gray-500 flex flex-col items-center gap-6">
                       <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                          <Video size={48} className="opacity-20 text-white" />
                       </div>
                       <p className="uppercase font-black tracking-widest text-[10px] text-gray-600">No telemetry data recorded for this node</p>
                     </div>
                   )}
                </div>
                <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center font-black text-cyan-400 text-xs shadow-lg shadow-cyan-500/10">
                        {playingWorkflow.recordedBy?.[0] || 'E'}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{playingWorkflow.recordedBy || 'Expert Contributor'}</span>
                   </div>
                   <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-cyan-400">Share Resource</Button>
                      <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-purple-400">Flag for Revision</Button>
                   </div>
                </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workflows;
