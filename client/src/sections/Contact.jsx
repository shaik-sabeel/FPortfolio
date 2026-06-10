import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Briefcase, DollarSign, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Listen for budget pre-selection from Pricing tier card clicks
  useEffect(() => {
    const handleBudgetSync = () => {
      const selectedBudget = sessionStorage.getItem('selectedBudget');
      if (selectedBudget) {
        setFormData((prev) => ({ ...prev, budget: selectedBudget }));
        // Clean up
        sessionStorage.removeItem('selectedBudget');
      }
    };

    // Run once on load just in case they clicked early
    handleBudgetSync();

    // Listen for custom event
    window.addEventListener('budgetSelect', handleBudgetSync);
    return () => window.removeEventListener('budgetSelect', handleBudgetSync);
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.budget) errors.budget = 'Please select a budget range';
    
    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your project';
    } else if (formData.message.trim().length < 15) {
      errors.message = 'Please describe your project in at least 15 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await axios.post('/api/contacts', formData);
      if (response.data && response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '',
          message: '',
        });
      } else {
        setServerError(response.data?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission API error:', error);
      setServerError(
        error.response?.data?.message || 
        'Could not connect to the server. Your lead was not saved.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-24 bg-[#050816] relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2 font-heading">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white">
            Start Your Project
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3 font-light">
            Fill out the details below, and Sabeel will get back to you within 24 hours to schedule a discovery call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col gap-6">
              <h3 className="text-white font-extrabold text-xl font-heading border-b border-white/5 pb-4">
                Contact Information
              </h3>
              
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex justify-center items-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-slate-500">Email Address</h4>
                  <a href="mailto:sabeel@example.com" className="text-sm font-medium hover:text-white transition-colors">
                    sabeel@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex justify-center items-center flex-shrink-0">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-slate-500">Project Strategy</h4>
                  <p className="text-sm font-medium">Remote worldwide (UTC+5:30)</p>
                </div>
              </div>
            </div>

            {/* Quick Conversion CTA Box */}
            <div className="glass-card p-8 rounded-3xl border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] relative overflow-hidden flex-grow flex flex-col justify-center">
              <h4 className="font-extrabold text-lg sm:text-xl font-heading mb-2">🚀 Instant Discovery Call</h4>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Want to brainstorm directly? Let's hop on a 15-minute structural audit call to evaluate your site speed, SEO, and database requirements.
              </p>
            </div>
          </div>

          {/* Right Side: Validated Contact Form */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-white/5 relative">
            <AnimatePresence mode="wait">
              {success ? (
                /* Success screen overlay */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center justify-center py-10"
                >
                  <div className="text-green-400 mb-6 animate-bounce">
                    <CheckCircle2 size={64} />
                  </div>
                  <h3 className="text-white font-extrabold text-2xl font-heading mb-2">Submission Successful!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6 font-light">
                    Your details have been saved to Sabeel's dashboard. You will receive an email confirmation shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                /* Main Form rendering */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  {serverError && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs sm:text-sm flex items-start gap-2">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-slate-300 text-xs uppercase font-bold tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors ${
                          validationErrors.name ? 'border-red-500/50' : 'border-white/5'
                        }`}
                        placeholder="John Doe"
                      />
                      {validationErrors.name && (
                        <span className="text-red-400 text-[11px] font-medium">{validationErrors.name}</span>
                      )}
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-slate-300 text-xs uppercase font-bold tracking-wider">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors ${
                          validationErrors.email ? 'border-red-500/50' : 'border-white/5'
                        }`}
                        placeholder="john@company.com"
                      />
                      {validationErrors.email && (
                        <span className="text-red-400 text-[11px] font-medium">{validationErrors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-slate-300 text-xs uppercase font-bold tracking-wider">Company name</label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors"
                        placeholder="Optional"
                      />
                    </div>

                    {/* Budget field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="budget" className="text-slate-300 text-xs uppercase font-bold tracking-wider">Est. Budget *</label>
                      <select
                        name="budget"
                        id="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={`w-full bg-[#110d25] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors ${
                          validationErrors.budget ? 'border-red-500/50' : 'border-white/5'
                        }`}
                      >
                        <option value="">Select range...</option>
                        <option value="< $1k">Under $1,000</option>
                        <option value="$1k - $2.5k">$1,000 - $2,500</option>
                        <option value="$2.5k - $5k">$2,500 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000 or custom scale</option>
                      </select>
                      {validationErrors.budget && (
                        <span className="text-red-400 text-[11px] font-medium">{validationErrors.budget}</span>
                      )}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-slate-300 text-xs uppercase font-bold tracking-wider">Project Details *</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors ${
                        validationErrors.message ? 'border-red-500/50' : 'border-white/5'
                      }`}
                      placeholder="Describe the application features, timelines, and main objective..."
                    />
                    {validationErrors.message && (
                      <span className="text-red-400 text-[11px] font-medium">{validationErrors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-sm tracking-widest uppercase transition-all duration-300 flex justify-center items-center gap-2 hover:scale-[1.02]"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                        Sending Lead...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Project Enquiry
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
