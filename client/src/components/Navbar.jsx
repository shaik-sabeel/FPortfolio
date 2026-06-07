import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if admin is logged in (has token)
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'services', title: 'Services' },
    { id: 'portfolio', title: 'Projects' },
    { id: 'process', title: 'Process' },
    { id: 'pricing', title: 'Pricing' },
    { id: 'contact', title: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    setActive(id);
    setToggle(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card border-b border-white/5 py-3' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-16">
        {/* Logo */}
        <div
          onClick={() => {
            setActive('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl sm:text-2xl font-black font-heading tracking-wider bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SABEEL.
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-[#00D4FF]/20 text-[#00D4FF] bg-[#00D4FF]/5">
            Full Stack
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="list-none hidden md:flex flex-row items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`${
                active === link.id ? 'text-white font-semibold' : 'text-slate-400'
              } hover:text-white text-[14px] lg:text-[15px] font-medium cursor-pointer transition-colors duration-200`}
            >
              {link.title}
            </li>
          ))}

          {isAdmin && (
            <li>
              <a
                href="/admin/dashboard"
                className="flex items-center gap-1 text-[13px] font-medium text-purple-400 hover:text-purple-300 border border-purple-500/20 bg-purple-500/5 px-3 py-1 rounded-full transition-all"
              >
                <Shield size={12} />
                Dashboard
              </a>
            </li>
          )}

          <li>
            <button
              onClick={() => handleLinkClick('contact')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00D4FF] text-white text-sm font-semibold tracking-wide shadow-glass transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-1">
                Hire Me
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#915EFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </li>
        </ul>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex flex-row items-center gap-4">
          {isAdmin && (
            <a
              href="/admin/dashboard"
              className="text-purple-400 border border-purple-500/20 bg-purple-500/5 p-1.5 rounded-full"
              title="Admin Panel"
            >
              <Shield size={16} />
            </a>
          )}
          <button
            onClick={() => setToggle(!toggle)}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            {toggle ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 glass-card border-b border-white/10 mx-4 mt-2 p-6 rounded-2xl flex flex-col gap-6 md:hidden z-40"
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`${
                    active === link.id ? 'text-white font-semibold' : 'text-slate-400'
                  } text-base font-medium cursor-pointer py-2 hover:text-white border-b border-white/5`}
                >
                  {link.title}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold tracking-wide shadow-glass flex justify-center items-center gap-1"
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
