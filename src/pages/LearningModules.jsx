import React from 'react';
import { Card, Button } from '../components/ui';
import { GraduationCap, CheckCircle, ArrowRight, BookOpen, Clock, Users, Play, Star } from 'lucide-react';
import { mockLearningModules } from '../data/mockData';
import { motion } from 'framer-motion';

const ModuleCard = ({ module, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="flex flex-col h-full hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden group">
      {module.progress === 100 && (
        <div className="absolute top-4 right-4 text-green-500">
           <CheckCircle size={20} fill="currentColor" className="text-green-500 bg-white rounded-full h-5 w-5" />
        </div>
      )}
      
      <div className="mb-6 flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:rotate-6 transition-transform">
          <BookOpen size={24} />
        </div>
        <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-widest">
           {module.steps} Steps
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-indigo-600 transition-colors">{module.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">Master this task using our pre-recorded workflows and documented solutions.</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest pb-4">
           <span className="flex items-center gap-1"><Clock size={12}/> 45m</span>
           <span className="flex items-center gap-1"><Users size={12}/> 142 learners</span>
           <span className="flex items-center gap-1 text-amber-500"><Star size={12} fill="currentColor" /> 4.9</span>
        </div>
      </div>

      <div className="mt-auto space-y-4 pt-6 border-t border-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>Progress</span>
            <span>{module.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${module.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full ${module.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} 
            />
          </div>
        </div>
        <Button variant={module.progress === 100 ? 'secondary' : 'primary'} className="w-full justify-between items-center group/btn py-6 rounded-2xl h-14">
           {module.progress === 100 ? 'Review Module' : 'Continue Learning'}
           <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  </motion.div>
);

const LearningModules = () => {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
           <h1 className="text-4xl font-black tracking-tight mb-4 uppercase">Learning Paths</h1>
           <p className="text-gray-500 text-lg">Curated task-based modules derived from real team operations.</p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
           <span>Sort By: </span>
           <button className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Recommended</button>
           <button className="hover:text-indigo-600">Newest</button>
           <button className="hover:text-indigo-600">Most Popular</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockLearningModules.map((m, idx) => (
          <ModuleCard key={m.id} module={m} index={idx} />
        ))}
        {/* Extra placeholders to make it look full */}
        <ModuleCard module={{ id: 4, name: "Database Migrations 101", steps: 8, progress: 0 }} index={3} />
        <ModuleCard module={{ id: 5, name: "Deploying to Kubernetes", steps: 15, progress: 0 }} index={4} />
      </div>
    </div>
  );
};

export default LearningModules;
