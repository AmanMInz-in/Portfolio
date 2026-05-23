/**
 * AMAN MINZ PORTFOLIO — server.js
 * Node.js / Express backend
 * Routes: GET /api/projects · POST /api/contact
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');

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
    title: 'Centralized Event Management Tool',
    description:
      'A college-wide event management platform with three-tier RBAC (Admin, Club Associate, Student). Enables clubs to publish events, manage registrations, and post notices. Won 1st place at SYMPHONIA Hackathon.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'RBAC', 'Nodemailer'],
    liveUrl:   process.env.EVENT_LIVE_URL   || 'https://college-events.vercel.app',
    githubUrl: process.env.EVENT_GITHUB_URL || 'https://github.com/amanminz/event-management',
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
    title: 'AI-Powered Study Assistant',
    description:
      'An intelligent study companion that generates personalized quizzes from uploaded notes, summarizes complex material, and tracks learning progress. Features a conversational UI with adaptive difficulty.',
    tech: ['React.js', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io'],
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
 * Validates input and returns a success/error response.
 * (Extend with Nodemailer or a DB write as needed.)
 */
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  /* --- Validation --- */
  const errors = [];
  if (!name    || name.trim().length < 2)       errors.push('Name must be at least 2 characters.');
  if (!email   || !isValidEmail(email.trim()))   errors.push('A valid email address is required.');
  if (!message || message.trim().length < 10)   errors.push('Message must be at least 10 characters.');

  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  /* --- Log submission (extend with DB / email service here) --- */
  console.log('\n📬 New contact form submission:');
  console.log(`  Name:    ${name.trim()}`);
  console.log(`  Email:   ${email.trim()}`);
  console.log(`  Message: ${message.trim().slice(0, 80)}${message.length > 80 ? '…' : ''}`);
  console.log(`  Time:    ${new Date().toISOString()}\n`);

  res.status(200).json({
    success: true,
    message: `Thanks, ${name.trim()}! I'll get back to you at ${email.trim()} soon.`,
  });
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
