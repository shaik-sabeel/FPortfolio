import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#03001e]/40 border-t border-white/5 py-12 relative overflow-hidden">
      {/* Decorative Blur Bubble */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-secondary/5 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5">
          {/* Logo & Intro */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-black font-heading tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SABEEL.
            </span>
            <p className="text-slate-400 text-sm max-w-sm">
              Creating high-performance digital products that turn user visits into long-term customer relationships.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card hover:border-primary/50 flex justify-center items-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card hover:border-secondary/50 flex justify-center items-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card hover:border-accent/50 flex justify-center items-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="mailto:sabeel@example.com"
              className="w-10 h-10 rounded-full glass-card hover:border-purple-400/50 flex justify-center items-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Projects</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="/admin/login" className="text-slate-600 hover:text-primary transition-colors flex items-center gap-1">
              Admin Portal
            </a>
          </div>

          <p className="text-center sm:text-right font-medium">
            &copy; {new Date().getFullYear()} Sabeel. All rights reserved. Built with ⚡
          </p>

          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 bg-white/5 hover:bg-primary/10 flex justify-center items-center text-slate-400 hover:text-white transition-all duration-300 focus:outline-none"
            title="Scroll to Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
