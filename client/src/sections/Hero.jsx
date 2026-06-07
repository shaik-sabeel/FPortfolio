import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, Terminal, Rocket } from 'lucide-react';
import Canvas3D from '../components/Canvas3D';

export default function Hero() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* 3D Canvas Backdrop */}
      <Canvas3D />

      {/* Futuristic Background Glowing mesh */}
      <div className="bg-hero-glow" />

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 max-w-7xl mx-auto px-6 sm:px-16 pointer-events-none">
        <div className="flex flex-col items-center text-center max-w-4xl">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wide"
          >
            <Rocket size={14} className="animate-pulse" />
            <span>Premium Web Solutions & Full Stack Systems</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading leading-tight tracking-tight text-white mb-6"
          >
            I Build Websites That Turn{' '}
            <span className="bg-gradient-to-r from-primary via-[#b993ff] to-secondary bg-clip-text text-transparent">
              Visitors
            </span>{' '}
            Into{' '}
            <span className="bg-gradient-to-r from-secondary via-[#88ebff] to-accent bg-clip-text text-transparent">
              Customers
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-base sm:text-xl md:text-2xl max-w-2xl font-light mb-10 leading-relaxed"
          >
            Empelling businesses and digital brands through cutting-edge SaaS design, full stack engineering, and high-conversion architectures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center items-center w-full pointer-events-auto"
          >
            <button
              onClick={() => handleScroll('contact')}
              className="w-full xs:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-base shadow-glass-glow hover:scale-105 hover:shadow-[0_10px_40px_0_rgba(0,212,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Terminal size={18} />
              Hire Sabeel
            </button>
            
            <button
              onClick={() => handleScroll('portfolio')}
              className="w-full xs:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-secondary/50 bg-white/5 text-white hover:bg-secondary/10 font-bold text-base hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Layers size={18} className="text-secondary group-hover:rotate-12 transition-transform" />
              View My Work
            </button>
          </motion.div>
        </div>
      </div>

      {/* Down Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors cursor-pointer" onClick={() => handleScroll('about')}>
        <span className="text-xs uppercase tracking-widest font-semibold font-heading">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </div>
    </section>
  );
}
