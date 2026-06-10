const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const ContactSubmission = require('../models/ContactSubmission');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    const totalSubmissions = await ContactSubmission.countDocuments();

    const pendingSubmissions = await ContactSubmission.countDocuments({ status: 'pending' });
    const contactedSubmissions = await ContactSubmission.countDocuments({ status: 'contacted' });
    const archivedSubmissions = await ContactSubmission.countDocuments({ status: 'archived' });

    // Calculate pipeline budget estimate (e.g. parsing budget ranges)
    const submissions = await ContactSubmission.find();
    let estimatedPipeline = 0;
    
    submissions.forEach(sub => {
      // Budgets could be like: '< $1k', '$1k - $2.5k', '$2.5k - $5k', '$5k - $10k', '$10k+'
      const b = sub.budget.toLowerCase();
      if (b.includes('10k+')) {
        estimatedPipeline += 10000;
      } else if (b.includes('5k') && b.includes('10k')) {
        estimatedPipeline += 7500;  // middle of 5k-10k
      } else if (b.includes('2.5k') && b.includes('5k')) {
        estimatedPipeline += 3750;  // middle of 2.5k-5k
      } else if (b.includes('1k') && b.includes('2.5k')) {
        estimatedPipeline += 1750;  // middle of 1k-2.5k
      } else if (b.includes('<') && b.includes('1k')) {
        estimatedPipeline += 500;   // under 1k
      } else {
        // Fallback if they typed custom budget
        const num = parseInt(b.replace(/[^0-9]/g, ''));
        if (!isNaN(num)) {
          estimatedPipeline += num;
        }
      }
    });

    const recentSubmissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totals: {
          projects: totalProjects,
          testimonials: totalTestimonials,
          submissions: totalSubmissions,
        },
        leads: {
          pending: pendingSubmissions,
          contacted: contactedSubmissions,
          archived: archivedSubmissions,
        },
        pipeline: {
          estimatedValue: estimatedPipeline,
        },
        recentSubmissions,
      },
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving analytics' });
  }
});

module.exports = router;
