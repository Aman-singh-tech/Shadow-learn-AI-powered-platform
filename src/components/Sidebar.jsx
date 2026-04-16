import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  LogOut
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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
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
    <aside className="w-64 h-screen sticky top-0 bg-[#030712] border-r border-gray-800/50 p-6 flex flex-col shadow-2xl z-20">
      <Link to="/" className="flex items-center gap-3 px-2 mb-10 group">
        <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
          <BrainCircuit size={28} className="text-blue-500" />
        </div>
        <span className="text-xl font-black tracking-tight text-white font-['Outfit']">ShadowLearn</span>
      </Link>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/20 font-bold uppercase tracking-wider text-xs"
      >
        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
