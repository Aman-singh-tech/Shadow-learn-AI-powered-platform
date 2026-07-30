import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ChevronRight,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const { login, register, googleLogin, forgotPassword, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (isForgotPassword) {
      result = await forgotPassword(formData.email);
      setLoading(false);
      if (result.success) {
        setIsForgotPassword(false);
      }
      return;
    } else if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }
    
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const result = await googleLogin(credentialResponse.credential);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#030810] flex items-center justify-center p-4 relative overflow-hidden font-['Inter']">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] mb-4">
            <div className="w-full h-full bg-[#0a0f1a] rounded-2xl flex items-center justify-center">
              <Cpu className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Shadow<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Learn</span>
          </h1>
          <p className="text-gray-400">AI-Powered Skill Acquisition</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0a0f1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Animated Glow Border */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-8 bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => { setIsLogin(true); setIsForgotPassword(false); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isLogin && !isForgotPassword ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              Login
            </button>
            <button 
              onClick={() => { setIsLogin(false); setIsForgotPassword(false); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${!isLogin && !isForgotPassword ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && !isForgotPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text"
                      name="name"
                      required={!isLogin && !isForgotPassword}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isForgotPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                    {isLogin && <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs text-cyan-400 hover:underline">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required={!isForgotPassword}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
                isLogin || isForgotPassword ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
              }`}
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {!isForgotPassword && (
            <>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-white/10"></div>
                <span className="text-xs text-gray-500 uppercase tracking-widest">or</span>
                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              <div className="mt-6 flex justify-center w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.error('Google Login Failed');
                  }}
                  theme="filled_black"
                  shape="pill"
                  text={isLogin ? "signin_with" : "signup_with"}
                  size="large"
                  width="300"
                />
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm text-gray-500">
            {isForgotPassword ? (
              <button 
                onClick={() => setIsForgotPassword(false)}
                className="text-cyan-400 hover:underline font-medium"
              >
                Back to Login
              </button>
            ) : isLogin ? (
              <>Don't have an account? <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 hover:underline font-medium">Create one now</button></>
            ) : (
              <>Already have an account? <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 hover:underline font-medium">Login here</button></>
            )}
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: Zap, label: 'Fast' },
            { icon: ShieldCheck, label: 'Secure' },
            { icon: Cpu, label: 'AI Ready' }
          ].map((feat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
              <feat.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{feat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
