/**
 * AMAN MINZ PORTFOLIO — server.js
 * Node.js / Express backend
 * Routes: GET /api/projects · POST /api/contact
 */

require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3001;

/* =====================================================
   MIDDLEWARE
   ===================================================== */
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================================================
   NODEMAILER SETUP
   ===================================================== */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.warn('⚠️  Email service not configured properly:', error.message);
  } else if (success) {
    console.log('✅ Email service ready to send messages');
  }
});

/* =====================================================
   DATA: Projects
   ===================================================== */
const projects = [
  {
    id: 1,
    title: 'Achiver — Certificate Verification Platform',
    description:
      'A secure digital platform that allows users to store, manage, and showcase certificates in one place. Features real-time verification, shareable public profiles, and JWT-secured private dashboards.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
    liveUrl:   process.env.ACHIVER_LIVE_URL   || 'https://achiver.vercel.app',
    githubUrl: process.env.ACHIVER_GITHUB_URL || 'https://github.com/amanminz/achiver',
  },
  {
    id: 2,
    title: 'EventIQ - Event Management System',
    description:
      'A centralized event coordination platform with three-tier RBAC (Admin, Club Associate, Student). Provides administrators with campus-wide oversight and club associates with dedicated dashboards to publish, manage, and coordinate student registrations and notices.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'RBAC', 'Nodemailer'],
    liveUrl:   process.env.EVENT_LIVE_URL   || 'https://central-event-management-system.vercel.app/',
    githubUrl: process.env.EVENT_GITHUB_URL || 'https://github.com/AmanMInz-in/Central-Event-Management-System',
  },
  {
    id: 3,
    title: 'HackOMania 2K25 — Hack Titans Submission',
    description:
      'National hackathon project built under 24 hours as a 1st-year student. Selected among 300+ teams across India. Implemented a real-world solution with a scalable REST API and responsive React frontend.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    liveUrl:   '#',
    githubUrl: process.env.HACK_GITHUB_URL || 'https://github.com/amanminz/hackomania-2k25',
  },
  {
    id: 4,
    title: 'Tanjiro.CV - AI Resume Generator',
    description:
      'A Gemini-integrated AI resume generator and optimizer. It analyzes job descriptions to tailor, format, and optimize candidate resumes with real-time AI suggestions for maximum ATS scoring.',
    tech: ['React.js', 'Node.js', 'Gemini API', 'MongoDB', 'Tailwind CSS'],
    liveUrl:   '#',
    githubUrl: '#',
  },
];

/* =====================================================
   HELPERS
   ===================================================== */
/**
 * Simple email regex validator.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =====================================================
   ROUTES
   ===================================================== */

/** Health check */
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Aman Minz Portfolio API is running.' });
});

/**
 * GET /api/projects
 * Returns the full project list as JSON.
 */
app.get('/api/projects', (_req, res) => {
  res.json(projects);
});

/**
 * GET /api/projects/:id
 * Returns a single project by id.
 */
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id, 10));
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  res.json(project);
});

/**
 * POST /api/contact
 * Accepts: { name, email, message }
 * Validates input, sends email via Nodemailer, and returns response.
 */
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  /* --- Validation --- */
  const errors = [];
  if (!name    || name.trim().length < 2)       errors.push('Name must be at least 2 characters.');
  if (!email   || !isValidEmail(email.trim()))   errors.push('A valid email address is required.');
  if (!message || message.trim().length < 10)   errors.push('Message must be at least 10 characters.');

  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const nameTrimmed = name.trim();
  const emailTrimmed = email.trim();
  const messageTrimmed = message.trim();

  /* --- Log submission --- */
  console.log('\n📬 New contact form submission:');
  console.log(`  Name:    ${nameTrimmed}`);
  console.log(`  Email:   ${emailTrimmed}`);
  console.log(`  Message: ${messageTrimmed.slice(0, 80)}${messageTrimmed.length > 80 ? '…' : ''}`);
  console.log(`  Time:    ${new Date().toISOString()}`);

  /* --- Send email via Nodemailer --- */
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      subject: `New Portfolio Message from ${nameTrimmed}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${nameTrimmed}</p>
        <p><strong>Email:</strong> <a href="mailto:${emailTrimmed}">${emailTrimmed}</a></p>
        <p><strong>Message:</strong></p>
        <p>${messageTrimmed.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Received at ${new Date().toISOString()}</small></p>
      `,
      replyTo: emailTrimmed,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${process.env.CONTACT_TO}\n`);

    res.status(200).json({
      success: true,
      message: `Thanks, ${nameTrimmed}! I've received your message and will get back to you soon.`,
    });
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    res.status(500).json({
      success: false,
      errors: ['Failed to send message. Please try again later.'],
    });
  }
});

/* =====================================================
   404 handler
   ===================================================== */
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

/* =====================================================
   START SERVER
   ===================================================== */
app.listen(PORT, () => {
  console.log(`\n🚀  Portfolio API running at http://localhost:${PORT}`);
  console.log(`    GET  /api/projects`);
  console.log(`    POST /api/contact\n`);
});
