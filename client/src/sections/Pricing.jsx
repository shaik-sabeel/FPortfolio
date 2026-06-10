import React from 'react';
import { Check, ShieldCheck, HelpCircle } from 'lucide-react';

const tiers = [
  {
    title: 'Starter Website',
    budget: '$299 - $599',
    description: 'Perfect for startups, local businesses, or personal portfolios needing a sleek, professional digital presence.',
    features: [
      '3 - 5 Custom Pages (React / Tailwind)',
      'Fully Responsive Layout (Mobile / Tablet)',
      'Basic On-Page SEO Configuration',
      'Interactive Contact Form integration',
      'Social Media & Domain Configuration',
      '2 Weeks Delivery Time',
    ],
    popular: false,
    color: '#00D4FF',
    budgetKey: '< $1k',
  },
  {
    title: 'Business Showcase',
    budget: '$799 - $1,499',
    description: 'Designed for growing brands requiring custom CMS panel logs, high-fidelity design work, and client integrations.',
    features: [
      'Up to 10 Pages or custom grids',
      'Premium animations (Framer Motion)',
      'Admin Dashboard Control Panel',
      'Custom database integrations (MongoDB)',
      'Comprehensive SEO & Speed Audits',
      'Nodemailer Contact integration',
      '3 - 4 Weeks Delivery Time',
    ],
    popular: true,
    color: '#915EFF',
    budgetKey: '$1k - $2.5k',
  },
  {
    title: 'Custom Web Application',
    budget: '$1,999+',
    description: 'Enterprise-grade SaaS, robust gaming portals, logistics maps, or AI applications tailored to complex user logic.',
    features: [
      'Fully custom frontend & server architecture',
      'Advanced User Authentication (JWT)',
      'Real-time updates (Socket.io/WebSockets)',
      'Custom AI / API integrations',
      'Interactive Analytics & Data Charts',
      'Continuous 1-Month support & updates',
      '6 - 8 Weeks Delivery Time',
    ],
    popular: false,
    color: '#F59E0B',
    budgetKey: '$2.5k - $5k',
  },
];

export default function Pricing() {
  const handleSelectTier = (budgetKey) => {
    // Store in session storage and dispatch custom event to alert the Contact form component
    sessionStorage.setItem('selectedBudget', budgetKey);
    window.dispatchEvent(new Event('budgetSelect'));
    
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="w-full py-24 bg-[#03001e]/20 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2 font-heading">
            Pricing Plans
          </p>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white">
            Transparent Pricing Structured for ROI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Choose a plan that fits your current business growth stage. Custom quotes are always available based on specifications.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between border relative transition-all duration-300 ${
                tier.popular
                  ? 'border-primary/50 shadow-[0_15px_50px_-10px_rgba(145,94,255,0.2)] lg:scale-105 z-10'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              {/* Popular Tag */}
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-[10px] uppercase font-black tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-white font-extrabold text-xl sm:text-2xl font-heading mb-1">
                    {tier.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light min-h-[50px] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Budget Range */}
                <div className="mb-8 pb-6 border-b border-white/5">
                  <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">EST. BUDGET</span>
                  <div className="text-2xl sm:text-3xl font-black font-heading mt-1" style={{ color: tier.color }}>
                    {tier.budget}
                  </div>
                </div>

                {/* Features */}
                <ul className="list-none flex flex-col gap-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm font-light">
                      <span className="mt-0.5 rounded-full flex justify-center items-center flex-shrink-0" style={{ color: tier.color }}>
                        <Check size={16} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectTier(tier.budgetKey)}
                className={`w-full py-4 rounded-2xl font-extrabold text-sm tracking-wider uppercase transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:scale-[1.02] hover:shadow-lg'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-[1.02]'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* FAQs Help Callout */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-16 p-6 rounded-2xl border border-white/5 bg-white/5 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="text-[#00D4FF] flex-shrink-0">
              <HelpCircle size={32} />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-heading">Need a completely custom arrangement?</h4>
              <p className="text-slate-400 text-xs sm:text-sm">We can schedule a discovery call to discuss custom features and custom sprints.</p>
            </div>
          </div>
          <button
            onClick={() => handleSelectTier('Custom')}
            className="px-6 py-3 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex-shrink-0"
          >
            Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
