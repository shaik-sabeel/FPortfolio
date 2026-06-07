const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from server root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const ContactSubmission = require('../models/ContactSubmission');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sabeel_portfolio';
    console.log(`Seeding database at: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await ContactSubmission.deleteMany();
    console.log('Cleared existing database entries.');

    // Seed Admin User
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@sabeel.dev',
      password: 'AdminPassword2026!', // Will be automatically hashed by UserSchema pre-save hook
    });
    console.log(`Seeded Admin User: ${adminUser.username} (password: AdminPassword2026!)`);

    // Seed Projects
    const projects = [
      {
        title: 'FF Arena Gaming Platform',
        description: 'A premium esports tournament platform featuring real-time bracket tracking, automated match lobbies, secure payments, and dynamic player profile stats. Designed to handle thousands of concurrent gamers.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://ff-arena.example.com',
        githubLink: 'https://github.com/sabeel/ff-arena',
        featured: true,
        order: 1,
      },
      {
        title: 'Mental Health AI Wellness Companion',
        description: 'An AI-powered web application using natural language sentiment analysis to assess mood patterns. Includes secure journaling, customized therapeutic worksheets, and live group support boards.',
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'OpenAI API', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://mind-ai.example.com',
        githubLink: 'https://github.com/sabeel/mental-health-ai',
        featured: true,
        order: 2,
      },
      {
        title: 'Furniture Shipping System',
        description: 'A heavy-duty B2B logistics platform featuring smart route optimization, multi-carrier quotes integration, real-time geolocation truck mapping, and a comprehensive inventory sync system.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Leaflet Maps', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://furni-ship.example.com',
        githubLink: 'https://github.com/sabeel/furniture-shipping',
        featured: true,
        order: 3,
      },
      {
        title: 'Creative Agency Portal & Showcase',
        description: 'A high-performance modern website built for a digital agency, featuring custom SVG micro-animations, 3D interactive layout cards, sleek dark/light modes, and exceptional SEO structure.',
        technologies: ['React.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://creative-agency.example.com',
        githubLink: 'https://github.com/sabeel/agency-web',
        featured: true,
        order: 4,
      },
    ];

    await Project.create(projects);
    console.log(`Seeded ${projects.length} sample projects.`);

    // Seed Testimonials
    const testimonials = [
      {
        name: 'Sarah Jenkins',
        company: 'CEO at TechVibe',
        feedback: 'Sabeel delivered an absolute masterpiece. Our website\'s conversion rate increased by 45% within the first month. His eye for detail and command over both frontend and backend is outstanding.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
      {
        name: 'David Chen',
        company: 'Founder of FF Esports',
        feedback: 'Working with Sabeel was a total game-changer. He built our tournament lobbies in record time. Excellent communication, writes clean code, and is always ready to suggest better tech solutions.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
      {
        name: 'Elena Rostova',
        company: 'Product VP at Luminate',
        feedback: 'Sabeel is rare. He has a top-tier aesthetic design sense and a thorough understanding of database models. He helped us design and launch our AI platform seamlessly.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
    ];

    await Testimonial.create(testimonials);
    console.log(`Seeded ${testimonials.length} sample testimonials.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
