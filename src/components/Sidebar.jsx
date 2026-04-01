import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Lightbulb, 
  GraduationCap, 
  Search, 
  Users, 
  RefreshCw, 
  BarChart3,
  LogOut,
  BrainCircuit
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-100'
      }`
    }
  >
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => {
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
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 p-4 flex flex-col">
      <Link to="/" className="flex items-center gap-2 px-2 mb-8">
        <BrainCircuit size={32} className="text-blue-600" />
        <span className="text-xl font-bold tracking-tight">ShadowLearn</span>
      </Link>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
