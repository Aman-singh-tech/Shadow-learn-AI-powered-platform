import React from 'react';
import { Card, Button } from '../components/ui';
import { Users, Search, Filter, Mail, MessageSquare, ExternalLink, Award, Code, Database, Layout, Shield } from 'lucide-react';
import { mockExperts } from '../data/mockData';
import { motion } from 'framer-motion';

const SkillBadge = ({ skill }) => (
  <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-tight border border-gray-100 hover:border-blue-200 hover:text-blue-600 transition-colors">
     {skill}
  </span>
);

const ExpertCard = ({ expert, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
  >
    <Card className="flex flex-col items-center text-center p-8 border-gray-100 hover:border-blue-200 group relative">
       <div className="absolute top-4 right-4 p-2 text-gray-300 hover:text-blue-500 transition-colors pointer-cursor">
          <ExternalLink size={18} />
       </div>
       
       <div className="relative mb-6">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-200 group-hover:rotate-12 transition-transform duration-500">
             {expert.name[0]}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-4 border-white flex items-center justify-center text-green-500 shadow-sm">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          </div>
       </div>

       <div className="mb-6 space-y-1">
          <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">{expert.name}</h3>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
             <Award size={14} className="text-amber-400" /> {expert.experience}
          </p>
       </div>

       <div className="flex flex-wrap justify-center gap-2 mb-8">
          {expert.skills.map(skill => (
            <SkillBadge key={skill} skill={skill} />
          ))}
       </div>

       <div className="flex w-full gap-2 mt-auto border-t border-gray-50 pt-6">
          <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-2 h-11 border-gray-200">
             <Mail size={16} /> Contact
          </Button>
          <Button variant="primary" size="sm" className="flex-1 flex items-center justify-center gap-2 h-11 shadow-lg shadow-blue-100">
             <MessageSquare size={16} /> Chat
          </Button>
       </div>
    </Card>
  </motion.div>
);

const Experts = () => {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
               <Users size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black tracking-tight uppercase">Team Experts</h1>
               <p className="text-gray-500">The collective brain of our organization.</p>
            </div>
         </div>
         <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm w-full md:w-auto">
            <div className="relative group w-full md:w-64">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Find skills..." 
                  className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 outline-none"
               />
            </div>
            <Button variant="outline" size="sm" className="px-4 border-gray-200 group-hover:border-blue-300">
               <Filter size={16}/>
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {mockExperts.map((e, idx) => (
           <ExpertCard key={e.id} expert={e} index={idx} />
         ))}
      </div>

      <div className="mt-12 bg-indigo-50/50 p-10 rounded-3xl border border-dashed border-indigo-200 text-center">
         <div className="max-w-xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-indigo-900 tracking-tight">Become an Expert?</h3>
            <p className="text-indigo-700/70 text-sm leading-relaxed">ShadowLearn automatically promotes contributors based on their workflow recordings and solution success rates.</p>
            <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-700 h-14 px-10 text-lg rounded-2xl shadow-xl shadow-indigo-200 mt-2">Apply for Verification</Button>
         </div>
      </div>
    </div>
  );
};

export default Experts;
