import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShoppingCart, Cpu, Gamepad2, Layers } from 'lucide-react';

const specialties = [
  {
    title: 'Business Websites',
    description: 'High-conversion marketing & corporate portals.',
    icon: Briefcase,
    color: '#915EFF',
  },
  {
    title: 'E-commerce Platforms',
    description: 'Scalable storefronts with robust checkouts.',
    icon: ShoppingCart,
    color: '#00D4FF',
  },
  {
    title: 'AI Integration',
    description: 'OpenAI, LLMs, and agentic integrations.',
    icon: Cpu,
    color: '#F59E0B',
  },
  {
    title: 'Gaming Platforms',
    description: 'Real-time state sync, matchmaking & stats.',
    icon: Gamepad2,
    color: '#ec4899',
  },
  {
    title: 'Custom Web Apps',
    description: 'Tailor-made dashboards and enterprise SaaS.',
    icon: Layers,
    color: '#10b981',
  },
];

export default function Trust() {
  return (
    <section className="w-full py-16 bg-[#07081d]/50 relative border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        <div className="text-center mb-10">
          <p className="text-[#00D4FF] font-bold text-xs uppercase tracking-widest mb-2 font-heading">
            Core Competencies
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Specialized in Solving Complex Business Challenges
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: item.color }}
                className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col items-center text-center cursor-pointer transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex justify-center items-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base font-heading mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed hidden sm:block">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
