import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Layout Sections
import Hero from './sections/Hero';
import Trust from './sections/Trust';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import WhyHireMe from './sections/WhyHireMe';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import About from './sections/About';
import Contact from './sections/Contact';

// Admin Panel Components
import Login from './admin/Login';
import DashboardLayout from './admin/DashboardLayout';
import Analytics from './admin/Analytics';
import ManageProjects from './admin/ManageProjects';
import ManageTestimonials from './admin/ManageTestimonials';
import Submissions from './admin/Submissions';

// Helper component that binds all homepage sections together
function PublicPage() {
  return (
    <div className="w-full relative bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Portfolio />
      <WhyHireMe />
      <Process />
      <Testimonials />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<PublicPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Console Panel */}
          <Route path="/admin/dashboard" element={<DashboardLayout />}>
            <Route index element={<Analytics />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="submissions" element={<Submissions />} />
          </Route>

          {/* Fallback Redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
