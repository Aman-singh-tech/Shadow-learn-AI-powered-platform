import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';
import { 
  LayoutDashboard, 
  Video, 
  Lightbulb, 
  GraduationCap, 
  Search, 
  Users, 
  RefreshCw, 
  BarChart3,
  BrainCircuit,
  LogOut,
  ChevronDown,
  Upload,
  Sun,
  Moon
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-blue-600/10 text-blue-400 font-bold border border-blue-500/20' 
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-100'
      }`
    }
  >
    <Icon size={20} />
    <span className="text-sm uppercase tracking-wider font-bold">{label}</span>
  </NavLink>
);

const Sidebar = () => {
  const { user, setUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const toastId = toast.loading('Uploading profile picture...');
    try {
      const response = await fetch(`${API_ENDPOINTS.USERS}/profile-picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Successfully uploaded!', { id: toastId });
        // Update user state context
        setUser({ ...user, profilePicture: data.profilePicture });
      } else {
        toast.error(data.error || 'Failed to upload photo', { id: toastId });
      }
    } catch (err) {
      toast.error('Network error. Check connection.', { id: toastId });
    }
    setDropdownOpen(false);
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/workflows", icon: Video, label: "Workflows" },
    { to: "/solutions", icon: Lightbulb, label: "Solutions" },
    { to: "/learning", icon: GraduationCap, label: "Learning Modules" },
    { to: "/ai-search", icon: Search, label: "AI Search" },
    { to: "/experts", icon: Users, label: "Experts" },
    { to: "/handoffs", icon: RefreshCw, label: "Handoffs" },
    { to: "/insights", icon: BarChart3, label: "Insights" },
  ];

  return (
    <aside
      className="w-64 h-screen sticky top-0 border-r p-6 flex flex-col shadow-2xl z-20 transition-all duration-500"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-sidebar)',
      }}
    >
      <Link to="/" className="flex items-center gap-3 px-2 mb-8 group">
        <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
          <BrainCircuit size={28} className="text-blue-500" />
        </div>
        <span className="text-xl font-black tracking-tight text-white font-['Outfit']">ShadowLearn</span>
      </Link>

      {/* User Profile Hook */}
      {user && (
        <div className="relative mb-6" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between bg-gray-800/20 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/40 transition-all p-3 rounded-xl gap-3 text-left"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture?.startsWith('http') ? user.profilePicture : `${API_BASE_URL}${user.profilePicture}`} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border border-blue-500/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg uppercase border border-blue-500/30">
                  {user.name?.charAt(0)}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-[#0a1120] border border-gray-800 shadow-xl rounded-xl z-50 overflow-hidden transform opacity-100 scale-100 transition-all">
              <button 
                onClick={() => fileInputRef.current.click()}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/80 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Upload size={16} className="text-blue-400" />
                Upload Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload}
                className="hidden" 
                accept="image/*"
              />
            </div>
          )}
        </div>
      )}
      
      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {navItems.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Theme Toggle */}
      <button
        id="sidebar-theme-toggle"
        onClick={toggleTheme}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="mt-2 mb-2 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border w-full"
        style={{
          backgroundColor: isDark ? 'rgba(34,211,238,0.05)' : 'rgba(79,70,229,0.06)',
          borderColor: isDark ? 'rgba(34,211,238,0.15)' : 'rgba(79,70,229,0.15)',
          color: isDark ? '#67e8f9' : '#4f46e5',
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
        <span className="text-xs font-bold uppercase tracking-wider">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/20 font-bold uppercase tracking-wider text-xs"
      >
        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
