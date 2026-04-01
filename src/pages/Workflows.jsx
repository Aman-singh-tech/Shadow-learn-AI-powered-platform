import React, { useState } from 'react';
import { Card, Button } from '../components/ui';
import { Video, Plus, Search, Filter, Play, MoreVertical, X, CheckCircle, Clock } from 'lucide-react';
import { mockWorkflows } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const WorkflowCard = ({ workflow }) => (
  <Card className="group relative border-gray-100 overflow-hidden">
    <div className="absolute top-4 right-4 text-gray-400 group-hover:text-blue-500 transition-colors">
      <MoreVertical size={20} />
    </div>
    
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
        <Video size={24} />
      </div>
      <div className="flex-1 min-w-0 pr-6">
        <h3 className="font-bold text-lg mb-1 truncate">{workflow.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{workflow.description}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-6">
      {workflow.tags.map(tag => (
        <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-100">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
          {workflow.recordedBy[0]}
        </div>
        <span className="font-medium text-gray-700">{workflow.recordedBy}</span>
        <span className="opacity-50">•</span>
        <span className="flex items-center gap-1"><Clock size={12}/> {workflow.duration}</span>
      </div>
      <Button variant="secondary" size="sm" className="flex items-center gap-2 h-9 text-blue-600 border-none px-3">
        <Play size={14} fill="currentColor" /> Play
      </Button>
    </div>
  </Card>
);

const Workflows = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState(mockWorkflows);
  
  const handleAdd = (e) => {
    e.preventDefault();
    toast.success('Successfully started recording setup!');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100%] z-0" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Workflow Library</h1>
          <p className="text-gray-500">Library of team recordings and expert process documentation.</p>
        </div>
        <div className="flex gap-3 relative z-10">
          <Button onClick={() => setIsModalOpen(true)} variant="primary" className="flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus size={20} /> Add Workflow
          </Button>
        </div>
      </div>

      {/* Tools */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold" />
          <input 
            type="text" 
            placeholder="Search workflows, tags, or authors..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 px-6">
            <Filter size={18} /> Filters
          </Button>
          <div className="flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button className="px-3 py-1.5 bg-white text-blue-600 rounded-lg shadow-sm text-sm font-bold">Grid</button>
            <button className="px-3 py-1.5 text-gray-500 text-sm font-medium">List</button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {workflows.map(workflow => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8 text-white relative -mx-8 -mt-8 p-10 pt-12 bg-blue-600">
                 <div>
                    <h2 className="text-2xl font-bold mb-2">Record New Workflow</h2>
                    <p className="text-blue-100 text-sm">Capture expert knowledge in real-time.</p>
                 </div>
                 <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Workflow Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Setting up a new Postgres cluster" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Briefly describe what this workflow covers..." 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Tags</label>
                    <input 
                      type="text" 
                      placeholder="DevOps, Security" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Author</label>
                    <input 
                      type="text" 
                      defaultValue="Sarah Johnson"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                      disabled
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="outline" className="flex-1 py-4 text-gray-500 font-bold" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1 py-4 text-lg shadow-xl shadow-blue-200">
                    Start Recording
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workflows;
