import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Code } from 'lucide-react';
import axios from 'axios';

const fallbackProjects = [
  {
    _id: '1',
    title: 'FF Arena Gaming Platform',
    description: 'A premium esports tournament platform featuring real-time bracket tracking, automated match lobbies, secure payments, and dynamic player profile stats.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    liveLink: 'https://ff-arena.example.com',
    githubLink: 'https://github.com/sabeel/ff-arena',
    category: 'gaming',
    featured: true,
  },
  {
    _id: '2',
    title: 'Mental Health AI Wellness Companion',
    description: 'An AI-powered web application using natural language sentiment analysis to assess mood patterns. Includes secure journaling and cognitive behavioral Therapy modules.',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'OpenAI API', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80',
    liveLink: 'https://mind-ai.example.com',
    githubLink: 'https://github.com/sabeel/mental-health-ai',
    category: 'ai',
    featured: true,
  },
  {
    _id: '3',
    title: 'Furniture Shipping System',
    description: 'A heavy-duty B2B logistics platform featuring smart route optimization, multi-carrier quotes integration, real-time geolocation truck mapping, and inventory status sync.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Leaflet Maps', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    liveLink: 'https://furni-ship.example.com',
    githubLink: 'https://github.com/sabeel/furniture-shipping',
    category: 'logistics',
    featured: true,
  },
  {
    _id: '4',
    title: 'Creative Agency Portal & Showcase',
    description: 'A high-performance modern website built for a digital agency, featuring custom SVG micro-animations, 3D interactive layout cards, and exceptional SEO structure.',
    technologies: ['React.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    liveLink: 'https://creative-agency.example.com',
    githubLink: 'https://github.com/sabeel/agency-web',
    category: 'web-apps',
    featured: true,
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        if (response.data && response.data.success && response.data.data.length > 0) {
          // Add a category property helper if not present
          const mapped = response.data.data.map(p => {
            let cat = 'web-apps';
            const title = p.title.toLowerCase();
            if (title.includes('ai') || title.includes('mental')) cat = 'ai';
            else if (title.includes('gaming') || title.includes('arena')) cat = 'gaming';
            else if (title.includes('ship') || title.includes('logistic')) cat = 'logistics';
            return { ...p, category: cat };
          });
          setProjects(mapped);
          setFiltered(mapped);
        } else {
          setProjects(fallbackProjects);
          setFiltered(fallbackProjects);
        }
      } catch (error) {
        console.warn('API error, loading fallback portfolio projects.', error.message);
        setProjects(fallbackProjects);
        setFiltered(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setFiltered(projects);
    } else {
      setFiltered(projects.filter((p) => p.category === tab));
    }
  };

  const tabs = [
    { id: 'all', title: 'All Projects' },
    { id: 'web-apps', title: 'Web Apps' },
    { id: 'gaming', title: 'Gaming' },
    { id: 'ai', title: 'AI Applications' },
    { id: 'logistics', title: 'B2B/Logistics' },
  ];

  return (
    <section id="portfolio" className="w-full py-24 bg-[#03001e]/20 relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-[#915EFF]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2 font-heading">
              My Portfolio
            </p>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white">
              Featured Work
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              Explore custom systems I've built from scratch, ensuring bulletproof security, high performance, and great UI.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 glass-card p-1.5 rounded-full border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-transparent'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-t-2 border-primary animate-spin" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project._id}
                  className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-white/5 transition-all duration-300 hover:border-primary/30 shadow-card hover:shadow-[0_15px_40px_-10px_rgba(145,94,255,0.15)]"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="w-12 h-12 rounded-full bg-white text-background flex justify-center items-center font-bold hover:scale-110 transition-transform"
                          title="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="w-12 h-12 rounded-full bg-[#100d25] text-white flex justify-center items-center font-bold hover:scale-110 transition-transform border border-white/10"
                          title="GitHub Repository"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Title & Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-black text-xl sm:text-2xl font-heading">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded border border-accent/20 text-accent bg-accent/5">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Pills */}
                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-slate-300 flex items-center gap-1 border border-white/5"
                          >
                            <Code size={10} className="text-[#00D4FF]" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mobile action buttons */}
                      <div className="flex items-center gap-4 sm:hidden border-t border-white/5 pt-4">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-secondary flex items-center gap-1 hover:underline"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            Repository
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
