const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add a valid email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  company: {
    type: String,
    trim: true,
    default: '',
  },
  budget: {
    type: String,
    required: [true, 'Please specify a budget range'],
  },
  message: {
    type: String,
    required: [true, 'Please add project details'],
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'archived'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema);
