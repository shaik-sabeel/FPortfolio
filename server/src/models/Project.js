const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  technologies: {
    type: [String],
    required: [true, 'Please add technologies used'],
  },
  image: {
    type: String,
    required: [true, 'Please add a project image URL or base64 data'],
  },
  liveLink: {
    type: String,
    default: '',
  },
  githubLink: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
