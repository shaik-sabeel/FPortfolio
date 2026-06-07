const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const { protect } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');

// Helper to send email notification
const sendEmailNotification = async (submission) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;

  // Verify that all required SMTP variables are present
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
    console.log('SMTP configuration is missing. Skipping email notification.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${submission.name}" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: submission.email,
      subject: `🔥 New Project Lead from ${submission.name} (${submission.budget})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
          <h2 style="color: #915EFF; border-bottom: 2px solid #915EFF; padding-bottom: 10px;">New Project Submission</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          <p><strong>Company:</strong> ${submission.company || 'Not Specified'}</p>
          <p><strong>Budget Range:</strong> <span style="background-color: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${submission.budget}</span></p>
          <div style="background-color: #f9fafb; border-left: 4px solid #915EFF; padding: 15px; margin-top: 15px; border-radius: 0 4px 4px 0;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 5px;">Project Details:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #374151;">${submission.message}</p>
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 25px; border-top: 1px solid #eee; padding-top: 10px;">Submitted from Sabeel's Freelancing Portfolio</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent: %s', info.messageId);
  } catch (error) {
    console.error('Nodemailer error:', error.message);
  }
};

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, company, budget, message } = req.body;

    if (!name || !email || !budget || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const submission = await ContactSubmission.create({
      name,
      email,
      company: company || '',
      budget,
      message
    });

    // Send email asynchronously (don't block the HTTP response)
    sendEmailNotification(submission);

    res.status(201).json({
      success: true,
      message: 'Your message has been received successfully! Sabeel will get back to you shortly.',
      data: submission
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Server error saving contact submission' });
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching contact submissions' });
  }
});

// @desc    Update submission status (e.g. mark as contacted/archived)
// @route   PUT /api/contacts/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'contacted', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid status' });
    }

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    res.json({ success: true, data: submission });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating submission' });
  }
});

// @desc    Delete contact submission
// @route   DELETE /api/contacts/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    await ContactSubmission.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Delete contact submission error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting submission' });
  }
});

module.exports = router;
