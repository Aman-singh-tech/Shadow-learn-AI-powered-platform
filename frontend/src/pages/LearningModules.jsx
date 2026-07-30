import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Users, 
  Play, 
  Star, 
  Sparkles, 
  BrainCircuit, 
  Loader2,
  X,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

const ModuleCard = ({ module, index, onStart }) => {
  const progress = module.progress || 0; 
  
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
          <Button 
            onClick={() => onStart(module)}
            variant={progress === 100 ? 'secondary' : 'primary'} 
            className={`w-full justify-between items-center group/btn h-14 rounded-2xl px-8 border-none shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
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
  const [selectedModule, setSelectedModule] = useState(null);
  const [playingWorkflow, setPlayingWorkflow] = useState(null);

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
            <ModuleCard key={m._id} module={m} index={idx} onStart={setSelectedModule} />
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center gap-4 text-gray-600 border border-dashed border-white/5 rounded-3xl bg-white/5">
           <Sparkles size={48} className="opacity-20" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">No operational paths detected in the system brain.</p>
           <Button variant="outline" className="mt-4 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">Record First Workflow</Button>
        </div>
      )}

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModule(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0f1a] rounded-[2.5rem] shadow-2xl w-full max-w-2xl border border-white/10 overflow-hidden"
            >
              <div className="p-10 pb-8 bg-gradient-to-br from-indigo-600/20 to-transparent border-b border-white/5 flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">{selectedModule.title}</h2>
                  <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">{selectedModule.difficulty || 'Neural Path'} • Expert: {selectedModule.instructor?.name || 'Collective Brain'}</p>
                </div>
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cognitive Overview</h4>
                  <p className="text-gray-400 leading-relaxed italic">"{selectedModule.description}"</p>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Operational Steps ({selectedModule.workflows?.length || 0})</h4>
                  <div className="space-y-3">
                    {selectedModule.workflows?.length > 0 ? (
                      selectedModule.workflows.map((wf, idx) => (
                        <div key={wf._id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-xs">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-sm font-black text-white uppercase tracking-tight">{wf.title}</p>
                              <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mt-1">Duration: {wf.duration || '0:00'}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setPlayingWorkflow(wf)} className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-500/20 rounded-full">
                             <Play size={18} fill="currentColor" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 border border-dashed border-white/5 rounded-2xl text-center">
                         <Video size={32} className="mx-auto text-gray-800 mb-4 opacity-20" />
                         <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">No telemetry steps anchored yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-10 pt-6 border-t border-white/5 bg-white/2">
                <Button 
                  onClick={() => {
                    toast.success("Training session initialized in neural link");
                    setSelectedModule(null);
                  }}
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-indigo-600/20 border-none"
                >
                  Confirm Neural Encoding
                </Button>
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
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
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
                       className="w-full h-full shadow-2xl shadow-indigo-500/10"
                       src={playingWorkflow.videoUrl?.startsWith('http') ? playingWorkflow.videoUrl : `${API_BASE_URL}${playingWorkflow.videoUrl}`}
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
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-xs shadow-lg shadow-indigo-500/10">
                        {selectedModule?.instructor?.name?.[0] || 'E'}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedModule?.instructor?.name || 'Expert Contributor'}</span>
                   </div>
                </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningModules;

