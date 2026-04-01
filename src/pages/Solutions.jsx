import React, { useState } from 'react';
import { Card, Button } from '../components/ui';
import { Lightbulb, Search, Filter, Hash, ChevronRight, MessageSquare, ThumbsUp, Tag as TagIcon } from 'lucide-react';
import { mockSolutions } from '../data/mockData';
import { motion } from 'framer-motion';

const SolutionItem = ({ solution, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Card className="hover:border-blue-200 transition-all cursor-pointer group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
            <Lightbulb size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{solution.problem}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2 italic">"{solution.solution}"</p>
            <div className="flex flex-wrap gap-2">
              {solution.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-100/50">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-400 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-medium">
             <MessageSquare size={16} /> 12
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium">
             <ThumbsUp size={16} /> 48
          </div>
          <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Card>
  </motion.div>
);

const Solutions = () => {
  const [solutions] = useState(mockSolutions);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-blue-500" />
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Solution Repository</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Access verified solutions to recurring problems captured by your top engineers.</p>
        
        <div className="mt-10 relative max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search solutions... e.g. 'Postgres leak' or 'Login error'" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="primary" className="px-8 h-14 rounded-2xl shadow-xl shadow-blue-200 text-lg">Search Brain</Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mt-1">Trending Tags:</span>
            <button className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-blue-300 transition-colors">#DEVOPS</button>
            <button className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-blue-300 transition-colors">#REACT</button>
            <button className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-blue-300 transition-colors">#API</button>
            <button className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-blue-300 transition-colors">#SECURITY</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {solutions.map((s, idx) => (
          <SolutionItem key={s.id} solution={s} index={idx} />
        ))}
        {/* Placeholder cards for depth */}
        <SolutionItem solution={{ problem: "Memory leak in Node stream handler", solution: "The stream was not properly piped to a writable sink, creating an infinite buffer.", tags: ["NodeJS", "Streams"] }} index={2} />
        <SolutionItem solution={{ problem: "CSS Z-Index fighting in modals", solution: "Implement a stacking context manager or use a React portal for all overlays.", tags: ["Frontend", "CSS"] }} index={3} />
      </div>
    </div>
  );
};

export default Solutions;
