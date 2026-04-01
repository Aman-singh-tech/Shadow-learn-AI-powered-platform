import React, { useState } from 'react';
import { Card, Button } from '../components/ui';
import { RefreshCw, CheckCircle2, Circle, Clock, ArrowRight, Shield, Database, Video, BookOpen, UserPlus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChecklistItem = ({ title, icon: Icon, description, status, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-4 p-5 hover:bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group"
  >
    <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
      status === 'complete' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 group-hover:border-blue-300'
    }`}>
      {status === 'complete' ? <CheckCircle2 size={16} fill="currentColor" className="text-white" /> : <Circle size={16} className="text-gray-200" />}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <h3 className={`text-lg font-bold tracking-tight transition-colors ${status === 'complete' ? 'text-gray-400 line-through' : 'text-gray-800 group-hover:text-blue-600'}`}>
          {title}
        </h3>
        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
          status === 'complete' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-amber-50 text-amber-600 border-amber-200'
        }`}>
          {status === 'complete' ? 'COMPLETE' : 'PENDING'}
        </span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed italic">{description}</p>
      
      {status === 'pending' && (
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" size="sm" className="h-9 px-4 text-xs font-bold gap-2">
            <Icon size={14} /> Handle now
          </Button>
          <Button variant="ghost" size="sm" className="h-9 px-4 text-xs font-bold gap-2">
             <Info size={14} /> Guidelines
          </Button>
        </div>
      )}
    </div>
  </motion.div>
);

const Handoffs = () => {
  const [activeTab, setActiveTab] = useState('offboarding');
  
  const checklist = [
    { title: "Knowledge Retrieval", description: "Submit all documentation and workflow recordings for current projects.", icon: BookOpen, status: "complete" },
    { title: "Credential Handover", description: "Ensure all passwords and MFA tokens are transferred to team vault.", icon: Shield, status: "pending" },
    { title: "In-Progress Sync", description: "Record a summary workflow of all features currently in active development.", icon: Video, status: "pending" },
    { title: "Infrastructure Ownership", description: "Transfer ownership of DB instances and cloud resources to leads.", icon: Database, status: "pending" },
    { title: "Succession Training", description: "Complete two shadowing sessions with the incoming engineer.", icon: UserPlus, status: "pending" }
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full z-0 p-10 flex items-end justify-end">
            <RefreshCw size={32} className="text-blue-200 animate-spin-slow duration-7000" />
         </div>
         
         <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">Handoff Intelligence</h1>
            <p className="text-gray-500 text-lg">AI-powered checklists and workflow capture for seamless role transitions.</p>
            
            <div className="w-full h-1 bg-gray-50 rounded-full mt-10 overflow-hidden">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "20%" }}
                  className="h-full bg-blue-600 shadow-xl shadow-blue-400"
               />
            </div>
            <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest px-2">
               <span>20% Complete</span>
               <span>Goal: Friday 24th</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('offboarding')}
              className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all font-bold ${activeTab === 'offboarding' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
               <span>Offboarding</span>
               {activeTab === 'offboarding' && <ArrowRight size={18} />}
            </button>
            <button 
              onClick={() => setActiveTab('onboarding')}
              className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all font-bold ${activeTab === 'onboarding' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
               <span>New Hire Onboarding</span>
               {activeTab === 'onboarding' && <ArrowRight size={18} />}
            </button>
            <button 
              onClick={() => setActiveTab('project')}
              className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all font-bold ${activeTab === 'project' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
               <span>Project Transfer</span>
               {activeTab === 'project' && <ArrowRight size={18} />}
            </button>
         </div>

         <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
               <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
               >
                  {checklist.map((item, idx) => (
                    <ChecklistItem key={idx} {...item} index={idx} />
                  ))}
               </motion.div>
            </AnimatePresence>
            
            <div className="pt-6">
               <Button variant="outline" className="w-full flex items-center justify-center gap-4 py-8 border-dashed border-2 text-gray-400 hover:text-blue-600 hover:border-blue-300 font-bold uppercase tracking-widest text-sm rounded-3xl">
                  Add Custom Handoff Requirement
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Handoffs;
