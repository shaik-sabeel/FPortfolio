import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Database, MessageSquare, Inbox, LogOut, Globe, ShieldCheck } from 'lucide-react';

export default function DashboardLayout() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#050816] flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-t-2 border-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const menuItems = [
    { path: '/admin/dashboard', title: 'Analytics', icon: BarChart3 },
    { path: '/admin/dashboard/projects', title: 'Projects', icon: Database },
    { path: '/admin/dashboard/testimonials', title: 'Testimonials', icon: MessageSquare },
    { path: '/admin/dashboard/submissions', title: 'Leads Inbox', icon: Inbox },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-full min-h-screen bg-[#050816] text-white flex flex-col md:flex-row">
      {/* Sidebar Panel */}
      <aside className="w-full md:w-64 bg-[#0a0624] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between py-6 px-4 flex-shrink-0 z-20">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-2 px-3 pb-6 border-b border-white/5 mb-8">
            <span className="text-[#915EFF]"><ShieldCheck size={20} /></span>
            <span className="font-extrabold font-heading text-base tracking-wider uppercase">Sabeel Console</span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div className="flex flex-col gap-2 mt-8 border-t border-white/5 pt-6">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Globe size={16} />
            Visit Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all focus:outline-none"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 relative overflow-y-auto max-h-screen">
        {/* Top Navbar details */}
        <header className="flex justify-between items-center pb-6 border-b border-white/5 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
              System Admin Control
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">Logged in as {user?.username}</p>
          </div>
        </header>

        {/* Render nested views dynamically */}
        <Outlet />
      </main>
    </div>
  );
}
