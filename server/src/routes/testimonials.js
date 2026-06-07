const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching testimonials' });
  }
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, company, feedback, image, rating } = req.body;

    if (!name || !company || !feedback) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const testimonial = await Testimonial.create({
      name,
      company,
      feedback,
      image: image || '',
      rating: rating || 5
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ success: false, message: 'Server error creating testimonial' });
  }
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    const { name, company, feedback, image, rating } = req.body;

    const updateData = {
      name: name || testimonial.name,
      company: company || testimonial.company,
      feedback: feedback || testimonial.feedback,
      image: image !== undefined ? image : testimonial.image,
      rating: rating !== undefined ? rating : testimonial.rating
    };

    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ success: false, message: 'Server error updating testimonial' });
  }
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Testimonial removed successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting testimonial' });
  }
});

module.exports = router;
