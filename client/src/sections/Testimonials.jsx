import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import axios from 'axios';

const fallbackTestimonials = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    company: 'CEO at TechVibe',
    feedback: 'Sabeel delivered an absolute masterpiece. Our website\'s conversion rate increased by 45% within the first month. His eye for detail and command over both frontend and backend is outstanding.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    _id: '2',
    name: 'David Chen',
    company: 'Founder of FF Esports',
    feedback: 'Working with Sabeel was a total game-changer. He built our tournament lobbies in record time. Excellent communication, writes clean code, and is always ready to suggest better tech solutions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    _id: '3',
    name: 'Elena Rostova',
    company: 'Product VP at Luminate',
    feedback: 'Sabeel is rare. He has a top-tier aesthetic design sense and a thorough understanding of database models. He helped us design and launch our AI platform seamlessly.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        if (response.data && response.data.success && response.data.data.length > 0) {
          setTestimonials(response.data.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.warn('API error, loading fallback testimonials.', error.message);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (loading) {
    return (
      <section className="w-full py-24 bg-[#050816] flex justify-center items-center">
        <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin" />
      </section>
    );
  }

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-24 bg-[#050816] relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] height-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] font-bold text-sm uppercase tracking-widest mb-2 font-heading">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white">
            Client Feedback
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3 font-light">
            Read direct feedback from clients and business owners who launched digital products with Sabeel.
          </p>
        </div>

        {/* Carousel Container */}
        {testimonials.length > 0 && (
          <div className="relative max-w-3xl mx-auto flex flex-col items-center">
            {/* Quote Icon Background */}
            <div className="absolute -top-10 left-4 sm:-left-12 text-[#915EFF]/10 pointer-events-none">
              <Quote size={120} />
            </div>

            {/* Testimonial Card Slider */}
            <div className="w-full overflow-hidden min-h-[320px] sm:min-h-[250px] flex items-center justify-center py-6 px-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="glass-card p-8 sm:p-10 rounded-3xl border border-white/5 shadow-card text-center sm:text-left flex flex-col sm:flex-row gap-6 sm:gap-8 items-center"
                >
                  {/* Client Image */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                    <img
                      src={current.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Feedback Content */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex gap-1 justify-center sm:justify-start mb-4">
                        {[...Array(current.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                        ))}
                      </div>

                      {/* Feedback Text */}
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6 font-light">
                        "{current.feedback}"
                      </p>
                    </div>

                    {/* Client Info */}
                    <div>
                      <h4 className="text-white font-extrabold text-lg font-heading">
                        {current.name}
                      </h4>
                      <p className="text-secondary text-xs sm:text-sm">
                        {current.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controllers */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full glass-card hover:border-primary/50 flex justify-center items-center text-slate-300 hover:text-white transition-all shadow-md focus:outline-none"
                title="Previous feedback"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-[#915EFF] w-6' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full glass-card hover:border-primary/50 flex justify-center items-center text-slate-300 hover:text-white transition-all shadow-md focus:outline-none"
                title="Next feedback"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
