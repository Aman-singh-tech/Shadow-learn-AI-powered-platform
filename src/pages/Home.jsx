import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { Video, BrainCircuit, GraduationCap, Lightbulb, Zap, Rocket, Star, Heart } from 'lucide-react';

const LandingNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between">
    <Link to="/" className="flex items-center gap-2">
      <BrainCircuit size={28} className="text-blue-600" />
      <span className="text-xl font-bold">ShadowLearn</span>
    </Link>
    <div className="flex items-center gap-8 text-sm text-gray-600 font-medium">
      <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
      <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
      <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">Dashboard</Link>
      <Button variant="primary" size="sm">Get Started</Button>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="group p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const testimonials = [
  { name: 'Sarah Miller', role: 'Head of Ops at TechFlow', text: 'ShadowLearn cut our onboarding time in half. Our new hires reach peak productivity in weeks instead of months.' },
  { name: 'David Chen', role: 'CTO at CloudStack', text: "Finally, a way to capture the 'unwritten' knowledge that usually disappears when employees leave." },
  { name: 'Emma Watson', role: 'HR Manager at GlobalSync', text: 'Task-based learning and workflow recordings have revolutionized our knowledge management.' }
];

const Home = () => {
  return (
    <div className="w-full bg-white text-gray-900 scroll-smooth">
      <LandingNavbar />
      
      {/* Hero Section */}
      <header className="pt-32 pb-20 px-8 max-w-6xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-blue-100">
            <Zap size={14} /> New: AI-Powered Knowledge Mining
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Capture Knowledge. 
            <span className="text-blue-600"> Scale Teams Faster.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop knowledge loss today. ShadowLearn helps companies record workflows, log solutions, and build AI-powered training from their best people.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 h-14 text-lg">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 h-14 text-lg">
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 rounded-2xl bg-gray-900 aspect-video shadow-2xl relative border-4 border-gray-800 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
          <div className="flex items-center justify-center h-full text-white/20 font-bold text-4xl">
            Product Dashboard Preview
          </div>
          <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-center text-white/60">
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">The ultimate knowledge engine</h2>
            <p className="text-gray-600">Equip your team with tools to capture, organize, and transfer expert knowledge.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Video} 
              title="Workflow Recording" 
              description="Capture screen and voice automatically to document complex processes." 
              delay={0.1}
            />
            <FeatureCard 
              icon={Lightbulb} 
              title="Solution Logs" 
              description="Keep searchable logs of problems and their step-by-step solutions." 
              delay={0.2}
            />
            <FeatureCard 
              icon={BrainCircuit} 
              title="AI Knowledge Base" 
              description="Query your team's collective brain using natural language." 
              delay={0.3}
            />
            <FeatureCard 
              icon={GraduationCap} 
              title="Task-Based Learning" 
              description="Turn recordings and logs into actionable training modules." 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <Star className="text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Loved by top-tier teams</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="p-8 italic border-none bg-blue-50/30 ring-1 ring-blue-100">
                <p className="text-gray-700 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to stop knowledge loss?</h2>
          <p className="text-blue-100 mb-10 text-lg">Join 500+ teams growing faster with ShadowLearn.</p>
          <div className="flex justify-center gap-4">
             <Link to="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl h-14 text-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <BrainCircuit size={24} className="text-blue-600" />
            <span className="font-bold">ShadowLearn</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Security</a>
            <a href="#" className="hover:text-blue-600">Twitter</a>
          </div>
          <div className="text-sm text-gray-400">
            © 2026 ShadowLearn. Built with <Heart size={14} className="inline text-red-400" /> for teams.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
