import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from '../components/ui';
import { BrainCircuit, Search, Send, Sparkles, ChevronRight, User, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuggestionChip = ({ text, onClick }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center gap-2 group shrink-0 shadow-sm"
  >
    <Sparkles size={16} className="text-amber-400 group-hover:scale-110 transition-transform" />
    {text}
  </button>
);

const Message = ({ text, sender, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    className={`flex w-full ${sender === 'ai' ? 'justify-start' : 'justify-end'}`}
  >
    <div className={`flex gap-3 max-w-[80%] ${sender === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transform transition-transform hover:scale-105 duration-300 ${
        sender === 'ai' ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-100' : 'bg-white text-gray-400 border-gray-100'
      }`}>
        {sender === 'ai' ? <BrainCircuit size={20} /> : <User size={20} />}
      </div>
      <div className={`p-5 rounded-3xl ${
        sender === 'ai' ? 'bg-white text-gray-800 border border-gray-100 shadow-sm' : 'bg-blue-600 text-white shadow-xl shadow-blue-100'
      }`}>
        <p className="text-sm leading-relaxed">{text}</p>
        {sender === 'ai' && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source:</span>
             <button className="px-2 py-0.5 bg-gray-50 text-blue-600 rounded-md text-[10px] font-bold hover:bg-blue-100 transition-colors">Onboarding_Workflow_V2.mp4</button>
             <button className="px-2 py-0.5 bg-gray-50 text-blue-600 rounded-md text-[10px] font-bold hover:bg-blue-100 transition-colors">Client_Handoff_Doc</button>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const AISearch = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I've indexed all team recordings and documents. Ask me anything like: 'How to fix login bug?' or 'Process for client handover'", sender: 'ai' }
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

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: `Based on Sarah's recording from last Tuesday: The login bug is usually related to JWT token expiration sync on the staging server. You should clear your cookies and ensure the internal VPN is active. Refer to 'Authentication Troubleshooting' workflow for the step-by-step fix.`, 
        sender: 'ai' 
      }]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-100 space-y-6 pt-4 pb-20">
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
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-400 flex items-center justify-center animate-pulse border border-blue-100 shadow-sm shadow-blue-50/50">
                  <BrainCircuit size={20} />
                </div>
                <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl flex gap-1 shadow-sm">
                   <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-0" />
                   <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-150" />
                   <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-300" />
                </div>
              </motion.div>
            )}
         </AnimatePresence>
         <div ref={chatEndRef} />
      </div>

      <div className="sticky bottom-0 bg-gray-50 pt-4 border-t border-gray-100 flex flex-col gap-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-2 px-2 mask-linear-gradient">
           <SuggestionChip text="How to fix the login bug?" onClick={() => handleSend("How to fix the login bug?")} />
           <SuggestionChip text="Guide to client handovers" onClick={() => handleSend("Guide to client handovers")} />
           <SuggestionChip text="Access database staging" onClick={() => handleSend("Access database staging")} />
           <SuggestionChip text="Onboarding checklist" onClick={() => handleSend("Onboarding checklist")} />
           <SuggestionChip text="Latest DevOps workflows" onClick={() => handleSend("Latest DevOps workflows")} />
        </div>
        
        <div className="relative group">
          <textarea 
            rows="1"
            placeholder="Ask anything from your company brain..." 
            className="w-full pl-6 pr-24 py-5 bg-white border border-gray-200 rounded-[2.5rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-xl shadow-blue-100/20 font-medium text-lg leading-relaxed resize-none overflow-hidden"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <button className="p-3 text-gray-400 hover:text-blue-500 transition-colors">
                <RefreshCw size={20} className="hover:rotate-180 transition-transform duration-500" />
             </button>
             <button 
                onClick={() => handleSend()}
                className="bg-blue-600 text-white p-3.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:scale-110 active:scale-95"
              >
                <Send size={24} fill="currentColor" className="ml-1" />
              </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest pb-4">
           ShadowLearn AI can make mistakes. Verify critical facts with original expert recordings.
        </p>
      </div>
    </div>
  );
};

export default AISearch;
