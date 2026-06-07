import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Palette, Code, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'Discovery',
    subtitle: 'Understanding your business goal',
    description: 'We align on your target audience, functional requirements, and competitors to map out a strategy that maximizes return on investment.',
    icon: Search,
    color: '#915EFF',
  },
  {
    title: 'Planning',
    subtitle: 'Architecture & specifications',
    description: 'We structure user flows, choose the technology stack, and write clear API and database specifications to ensure a solid system roadmap.',
    icon: Compass,
    color: '#00D4FF',
  },
  {
    title: 'Design',
    subtitle: 'UI/UX Interactive wireframes',
    description: 'We create premium, modern design layouts. You receive interactive Figma mockups to see exactly how your application will look and behave.',
    icon: Palette,
    color: '#F59E0B',
  },
  {
    title: 'Development',
    subtitle: 'Frontend & Backend coding',
    description: 'We build your application using clean, documented, and secure code. Frontend animations (Framer Motion) and backend APIs are wired together.',
    icon: Code,
    color: '#ec4899',
  },
  {
    title: 'Testing',
    subtitle: 'Security audits & QA checks',
    description: 'Every element undergoes rigorous quality checks: speed optimizations, security vulnerabilities scans, mobile viewport checks, and database stress tests.',
    icon: CheckCircle,
    color: '#10b981',
  },
  {
    title: 'Launch',
    subtitle: 'Deployment & handover',
    description: 'We deploy the client codebase to high-performance servers (Vercel/Render) and configure custom domains, database fallbacks, and analytic systems.',
    icon: Rocket,
    color: '#3b82f6',
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full py-24 bg-[#03001e]/20 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-2 font-heading">
            My Workflow
          </p>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white">
            From Concept to Production
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light leading-relaxed">
            A structured, transparent development methodology focused on speed, reliability, and close collaboration.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 timeline-line hidden sm:block opacity-40" />

          {/* Steps List */}
          <div className="flex flex-col gap-12 sm:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row items-start sm:items-center w-full ${
                    index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Space filler for alternate columns */}
                  <div className="w-full sm:w-1/2 hidden sm:block" />

                  {/* Center Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 w-10 h-10 rounded-full bg-[#050816] border-2 -translate-x-1/2 flex items-center justify-center z-10 hidden sm:flex"
                       style={{ borderColor: step.color }}>
                    <Icon size={16} style={{ color: step.color }} />
                  </div>

                  {/* Card Content block */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full sm:w-[45%] glass-card p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-white/10 group cursor-default transition-all shadow-md relative"
                  >
                    {/* Mobile indicator badge */}
                    <div className="flex items-center gap-2 mb-4 sm:hidden">
                      <div className="w-8 h-8 rounded-lg flex justify-center items-center"
                           style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                        <Icon size={16} />
                      </div>
                      <span className="text-[10px] uppercase font-black tracking-widest" style={{ color: step.color }}>
                        Step 0{index + 1}
                      </span>
                    </div>

                    <span className="hidden sm:inline-block text-[10px] uppercase font-black tracking-widest mb-2" style={{ color: step.color }}>
                      Step 0{index + 1}
                    </span>

                    <h3 className="text-white font-extrabold text-lg sm:text-xl font-heading mb-1">
                      {step.title}
                    </h3>
                    
                    <h4 className="text-slate-300 font-semibold text-xs sm:text-sm mb-4">
                      {step.subtitle}
                    </h4>

                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
