import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from '../components/ui';
import { API_ENDPOINTS } from '../config/api';
import { 
  BrainCircuit, 
  Search, 
  Send, 
  Sparkles, 
  ChevronRight, 
  User, 
  AlertCircle, 
  RefreshCw,
  Zap,
  Cpu,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const SuggestionChip = ({ text, onClick }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 bg-[#0a0f1a]/80 border border-white/5 rounded-xl text-sm font-medium text-gray-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex items-center gap-2 group shrink-0 whitespace-nowrap"
  >
    <Sparkles size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
    {text}
  </button>
);

const Message = ({ text, sender, delay = 0 }) => {
  const { user } = useAuth();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`flex w-full ${sender === 'ai' ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex gap-3 max-w-[85%] ${sender === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transform transition-all hover:scale-105 duration-300 ${
          sender === 'ai' 
            ? 'bg-gradient-to-br from-cyan-600 to-cyan-500 text-white border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
            : 'bg-white/5 text-purple-400 border-white/10'
        }`}>
          {sender === 'ai' ? <BrainCircuit size={20} /> : <User size={20} />}
        </div>
        <div className={`p-5 rounded-3xl backdrop-blur-md relative overflow-hidden group ${
          sender === 'ai' 
            ? 'bg-[#0a0f1a]/80 text-gray-200 border border-white/10 shadow-xl' 
            : 'bg-gradient-to-br from-purple-600/20 to-purple-500/20 text-white border border-purple-500/30'
        }`}>
          {/* Subtle accent line for AI messages */}
          {sender === 'ai' && (
            <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-500/50"></div>
          )}
          
          <p className="text-sm leading-relaxed">{text}</p>
          
          {sender === 'ai' && (
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Linked Knowledge:</span>
               <button className="px-2 py-0.5 bg-white/5 border border-white/5 text-cyan-400 rounded-md text-[10px] font-bold hover:bg-cyan-500/10 transition-colors uppercase tracking-tighter">Onboarding_Workflow_V.2</button>
               <button className="px-2 py-0.5 bg-white/5 border border-white/5 text-cyan-400 rounded-md text-[10px] font-bold hover:bg-cyan-500/10 transition-colors uppercase tracking-tighter">Handover_Protocol</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AISearch = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { text: `Hello ${user?.name?.split(' ')[0] || 'Expert'}! I've indexed all team recordings and documents. Ask me anything about our workflows or expert solutions.`, sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.AI}/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: text })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { text: data.result, sender: 'ai' }]);
      } else {
        setMessages(prev => [...prev, { text: 'Sorry, I encountered an error: ' + (data.error || 'Unknown error'), sender: 'ai' }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { text: 'Failed to connect to AI server. Ensure the backend is running.', sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col relative font-['Inter']">
       {/* Ambient backgrounds */}
       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
       <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 space-y-8 pt-4 pb-24 relative z-10 px-4">
         <AnimatePresence>
            {messages.map((m, idx) => (
              <Message key={idx} text={m.text} sender={m.sender} />
            ))}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="flex justify-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center animate-pulse border border-cyan-500/20 shadow-sm shadow-cyan-500/10">
                  <BrainCircuit size={20} />
                </div>
                <div className="bg-[#0a0f1a]/80 border border-white/10 px-6 py-4 rounded-3xl flex gap-1 shadow-sm backdrop-blur-md">
                   <div className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce delay-0" />
                   <div className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce delay-150" />
                   <div className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce delay-300" />
                </div>
              </motion.div>
            )}
         </AnimatePresence>
         <div ref={chatEndRef} />
      </div>

      <div className="sticky bottom-0 bg-transparent pt-4 flex flex-col gap-4 relative z-20">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-2 px-6">
           <SuggestionChip text="How to fix the login bug?" onClick={() => handleSend("How to fix the login bug?")} />
           <SuggestionChip text="Access database staging" onClick={() => handleSend("Access database staging")} />
           <SuggestionChip text="Onboarding checklist" onClick={() => handleSend("Onboarding checklist")} />
           <SuggestionChip text="Latest DevOps workflows" onClick={() => handleSend("Latest DevOps workflows")} />
        </div>
        
        <div className="relative group px-4 pb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030810] via-[#030810]/80 to-transparent -top-20 pointer-events-none"></div>
          
          <div className="relative">
            <textarea 
              rows="1"
              placeholder="Query the company brain..." 
              className="w-full pl-6 pr-24 py-5 bg-[#0a0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all shadow-2xl shadow-cyan-500/5 font-medium text-lg leading-relaxed resize-none overflow-hidden text-white placeholder:text-gray-600"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <button className="p-3 text-gray-500 hover:text-cyan-400 transition-colors">
                  <RefreshCw size={20} className="hover:rotate-180 transition-transform duration-700" />
               </button>
               <button 
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white p-3.5 rounded-2xl hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  {isTyping ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} fill="currentColor" />}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearch;
