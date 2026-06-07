import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code2, ShoppingBag, BrainCircuit, BarChart3, Wrench } from 'lucide-react';

const services = [
  {
    title: 'Website Development',
    description: 'Ultra-fast, pixel-perfect websites optimized for search engines and engineered to drive maximum visitor conversions.',
    icon: Globe,
    color: '#915EFF',
  },
  {
    title: 'Full Stack Web Apps',
    description: 'Robust, production-grade applications with custom database integrations, APIs, and scalable system architectures.',
    icon: Code2,
    color: '#00D4FF',
  },
  {
    title: 'E-Commerce Development',
    description: 'High-performance digital stores with payment gateways (Stripe/PayPal), inventory managers, and advanced analytics.',
    icon: ShoppingBag,
    color: '#F59E0B',
  },
  {
    title: 'AI Integration',
    description: 'Adding smart functionality to your systems, including chatbot assistants, smart workflows, and OpenAI models.',
    icon: BrainCircuit,
    color: '#ec4899',
  },
  {
    title: 'Dashboard Development',
    description: 'Interactive analytics control centers, showing real-time metrics, custom data charts, and role-based access control.',
    icon: BarChart3,
    color: '#10b981',
  },
  {
    title: 'Website Maintenance',
    description: 'Continuous server optimization, performance audit tune-ups, cloud security hardening, and ongoing design upgrades.',
    icon: Wrench,
    color: '#3b82f6',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-24 bg-[#050816] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-2 font-heading">
            What I Offer
          </p>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white">
            High-Value Services to Grow Your Brand
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4 font-light leading-relaxed">
            I combine clean engineering with user psychology to deliver digital products that look stunning and perform flawlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card glass-card-hover p-8 rounded-3xl relative group overflow-hidden"
              >
                {/* Glow Border Effect */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${service.color}, transparent)`,
                  }}
                />

                {/* Service Icon Container */}
                <div
                  className="w-14 h-14 rounded-2xl flex justify-center items-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-md"
                  style={{
                    backgroundColor: `${service.color}15`,
                    color: service.color,
                  }}
                >
                  <Icon size={28} />
                </div>

                {/* Service Title */}
                <h3 className="text-white font-extrabold text-xl font-heading mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
