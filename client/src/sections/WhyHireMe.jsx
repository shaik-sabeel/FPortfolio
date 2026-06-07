import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Code2, Award, HeartHandshake } from 'lucide-react';

const stats = [
  {
    value: '50+',
    label: 'Projects Completed',
    description: 'Successful digital launches across SaaS, e-commerce, and gaming.',
    icon: Award,
    color: '#915EFF',
  },
  {
    value: '99%',
    label: 'Client Satisfaction',
    description: 'Based on transparent milestones, quality code, and excellent communication.',
    icon: HeartHandshake,
    color: '#00D4FF',
  },
  {
    value: '15+',
    label: 'Tech Mastered',
    description: 'Proficiency in frontend structures, databases, APIs, and cloud services.',
    icon: Code2,
    color: '#F59E0B',
  },
  {
    value: '100%',
    label: 'On-Time Delivery',
    description: 'Structured sprints ensuring deliverables are met right on schedule.',
    icon: Zap,
    color: '#ec4899',
  },
];

export default function WhyHireMe() {
  return (
    <section className="w-full py-24 bg-[#050816] relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#915EFF]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Headline & Explanatory Text */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] text-xs font-semibold mb-6">
              <ShieldCheck size={14} />
              <span>Engineered for Success</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white leading-tight mb-6">
              Why Partner With Sabeel?
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-6">
              I don't just write code; I design business systems. Every product is optimized for speed, built with security, and planned around your target user behavior.
            </p>

            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-8">
              By working with a single full-stack specialist, you skip the management overhead of agencies, get direct communication, and launch 3x faster.
            </p>

            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm tracking-wide transition-all duration-300"
            >
              Start My Project
            </a>
          </div>

          {/* Right Column: Animated Stats Dashboard */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 sm:p-8 rounded-3xl relative border border-white/5 hover:border-white/10 group transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex justify-center items-center mb-6"
                    style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3
                    className="text-4xl sm:text-5xl font-black font-heading tracking-tight mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </h3>
                  <h4 className="text-white font-bold text-base font-heading mb-2">
                    {stat.label}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
