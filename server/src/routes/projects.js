const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Fetch project error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching project' });
  }
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, technologies, image, liveLink, githubLink, featured, order } = req.body;

    if (!title || !description || !technologies || !image) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const project = await Project.create({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()),
      image,
      liveLink,
      githubLink,
      featured: featured || false,
      order: order || 0
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, message: 'Server error creating project' });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const { title, description, technologies, image, liveLink, githubLink, featured, order } = req.body;

    const updateData = {
      title: title || project.title,
      description: description || project.description,
      image: image || project.image,
      liveLink: liveLink !== undefined ? liveLink : project.liveLink,
      githubLink: githubLink !== undefined ? githubLink : project.githubLink,
      featured: featured !== undefined ? featured : project.featured,
      order: order !== undefined ? order : project.order
    };

    if (technologies) {
      updateData.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim());
    }

    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ success: false, message: 'Server error updating project' });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Project removed successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
});

module.exports = router;
