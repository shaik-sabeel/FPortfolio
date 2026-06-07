import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BrainCircuit, User } from 'lucide-react';

const skills = [
  { name: 'React.js / Next.js', level: 95, color: '#00D4FF' },
  { name: 'Node.js / Express.js', level: 90, color: '#915EFF' },
  { name: 'MongoDB / Mongoose', level: 85, color: '#10b981' },
  { name: 'Three.js / WebGL / Canvas3D', level: 80, color: '#ec4899' },
  { name: 'AI API Integrations (OpenAI/Claude)', level: 90, color: '#F59E0B' },
  { name: 'Modern UI/UX Design & Figma', level: 88, color: '#3b82f6' },
];

export default function About() {
  return (
    <section id="about" className="w-full py-24 bg-[#050816] relative overflow-hidden">
      {/* Background glow bubble */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Sabeel Biography */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-6">
              <User size={14} />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white leading-tight mb-6">
              Hi, I'm Sabeel — <br />
              <span className="bg-gradient-to-r from-primary via-[#b993ff] to-secondary bg-clip-text text-transparent">
                Digital Architect
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6">
              I am a Full Stack Developer specializing in building high-conversion, highly-interactive web applications. With a strong foundation in modern design aesthetics and deep server-side logic, I bridge the gap between creative visual UI and stable engineering.
            </p>

            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
              Over the past 5 years, I've worked with agencies, founders, and enterprises to ship esports portals, AI wellness products, B2B mapping consoles, and beautiful SaaS marketing pipelines. I write test-driven code, optimize servers for low latency, and build layouts that load instantly.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 gap-6 w-full border-t border-white/5 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#915EFF]/10 flex justify-center items-center text-primary flex-shrink-0">
                  <Terminal size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm font-heading">Clean Code</h4>
                  <p className="text-slate-400 text-xs mt-1">Modular, testable, and production-ready structures.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 flex justify-center items-center text-secondary flex-shrink-0">
                  <BrainCircuit size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm font-heading">AI Features</h4>
                  <p className="text-slate-400 text-xs mt-1">Integrating language models, search, and pipelines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skill Bars */}
          <div className="lg:col-span-6 w-full glass-card p-8 sm:p-10 rounded-3xl border border-white/5 relative">
            <h3 className="text-white font-extrabold text-xl font-heading mb-8">
              Technical Mastery
            </h3>

            <div className="flex flex-col gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-300">{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.level}%</span>
                  </div>

                  {/* Slider bar */}
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
