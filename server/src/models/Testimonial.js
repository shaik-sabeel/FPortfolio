const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a client name'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Please add a company or position'],
    trim: true,
  },
  feedback: {
    type: String,
    required: [true, 'Please add feedback text'],
  },
  image: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
