import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Key, User, ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050816] flex justify-center items-center px-6 relative bg-grid-pattern">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Main Login card */}
      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-white/5 relative z-10 shadow-card">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors mb-8 focus:outline-none"
        >
          <ArrowLeft size={14} />
          Back to website
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex justify-center items-center mx-auto mb-4">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-white font-extrabold text-2xl font-heading">Admin Portal</h2>
          <p className="text-slate-400 text-xs mt-1">Access secure content management dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs sm:text-sm font-medium flex items-center gap-2">
              <ShieldAlert size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-slate-500">
                <User size={16} />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors"
                placeholder="Enter username"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-slate-400 text-xs uppercase font-bold tracking-wider">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-slate-500">
                <Key size={16} />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors"
                placeholder="Enter password"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-2 hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
