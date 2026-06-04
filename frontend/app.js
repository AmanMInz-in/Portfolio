/**
 * AMAN MINZ PORTFOLIO — app.js
 * Frontend logic: cursor, nav, scroll animations,
 * dynamic skill/project rendering, contact form
 */

/* =====================================================
   CONFIG
   ===================================================== */
// Note: Backend is currently NOT deployed. The website runs in fully static mode.
// Once you deploy your backend (e.g. on Render or Railway), uncomment the line below 
// and update it with your live backend domain:
// const API_BASE = 'http://localhost:3001/api';

/* =====================================================
   NAV: scroll + hamburger
   ===================================================== */
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =====================================================
   SMOOTH SCROLL for all nav/anchor links
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* =====================================================
   SCROLL REVEAL (IntersectionObserver)
   ===================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger multiple elements in same container
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================================================
   HERO: animated title typewriter/cycle
   ===================================================== */
const titles = [
  'Full Stack Developer',
  'React & Node Craftsman',
  'AI/ML Enthusiast',
  'Hackathon Champion',
  'Problem Solver',
];
let titleIndex = 0;
const titleEl = document.getElementById('titleScroll');

function cycleTitle() {
  if (!titleEl) return;
  titleEl.style.opacity = '0';
  titleEl.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    titleEl.textContent = titles[titleIndex];
    titleEl.style.transition = 'opacity 0.4s, transform 0.4s';
    titleEl.style.opacity = '1';
    titleEl.style.transform = 'translateY(0)';
  }, 350);
}
titleEl && setInterval(cycleTitle, 2800);

/* =====================================================
   SKILLS: render from static data
   ===================================================== */
const skillsData = [
  {
    name: 'React.js',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"><ellipse cx="64" cy="64" rx="50" ry="20" transform="rotate(0 64 64)"/><ellipse cx="64" cy="64" rx="50" ry="20" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="50" ry="20" transform="rotate(120 64 64)"/><circle cx="64" cy="64" r="12" fill="currentColor"/></g></svg>',
    color: '#61dafb',
    type: 'Frontend'
  },
  {
    name: 'JavaScript',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#f7df1e"/><text x="50%" y="62%" text-anchor="middle" font-family="Arial, sans-serif" font-size="66" font-weight="700" fill="#000">JS</text></svg>',
    color: '#000000',
    type: 'Frontend'
  },
  {
    name: 'HTML5',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M20 12h88l-8 88L64 116 28 100 20 12Z" fill="#e34f26"/><path d="M64 106l32-9 6-68H64v77Zm0-46h16l1-15H64V60Zm0 31l-.1.0-14-4-1-15h14v15Zm0-31h16l1-15H64v15Z" fill="#fff"/></svg>',
    color: '#ffffff',
    type: 'Frontend'
  },
  {
    name: 'CSS3',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M20 12h88l-8 88L64 116 28 100 20 12Z" fill="#264de4"/><path d="M64 106l32-9 6-68H64v77Zm0-46h16l1-15H64V60Zm0 31l-.1.0-14-4-1-15h14v15Z" fill="#fff"/></svg>',
    color: '#ffffff',
    type: 'Frontend'
  },
  {
    name: 'Node.js',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M64 12l48 27v50l-48 27-48-27V39l48-27Z" fill="#43853d"/><path d="M64 40v48M64 40l24 14M64 40l-24 14M64 88l24-14M64 88l-24-14" stroke="#fff" stroke-width="8" stroke-linecap="round"/></svg>',
    color: '#ffffff',
    type: 'Backend'
  },
  {
    name: 'Express.js',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#000"/><text x="50%" y="60%" text-anchor="middle" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="#fff">ex</text></svg>',
    color: '#ffffff',
    type: 'Backend'
  },
  {
    name: 'MongoDB',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M64 116s36-29 36-57c0-31-36-51-36-51s-36 20-36 51c0 28 36 57 36 57Z" fill="#47a248"/><path d="M64 28s24 24 24 54c0 23-24 44-24 44s-24-21-24-44c0-30 24-54 24-54Z" fill="#419343"/><path d="M64 72c8-7 8-17 6-24-6 9-16 14-22 20 1 5 4 11 8 14 4-2 7-5 8-10Z" fill="#fff" opacity="0.16"/></svg>',
    color: '#47a248',
    type: 'Database'
  },
  {
    name: 'MySQL',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="50" fill="#00758f"/><path d="M38 56c12 14 28 18 36 18 0 0 16-1 22-7 2-2 5-11 4-18-2-16-11-24-16-28-18-12-44 0-46 0-8 4-12 7-14 13-2 7 1 19 4 22 5 6 10 8 10 8Z" fill="#fff"/></svg>',
    color: '#ffffff',
    type: 'Database'
  },
  {
    name: 'Git',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="50" fill="#f34f29"/><path d="M82 46a10 10 0 1 0-8-16L52 54a22 22 0 0 0-6 14 22 22 0 0 0 6 15l16 16a10 10 0 1 0 8-17L58 66l18-18a10 10 0 0 0 6-2Z" fill="#fff"/></svg>',
    color: '#ffffff',
    type: 'Tools'
  },
  {
    name: 'GitHub',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="52" fill="#181717"/><path d="M47 94s-6-2-10-5c-4-3-8-12-3-18 6-6 11-1 12 0 0 0 2 4 4 1 0 0 5-1 6-4 0 0 6-2 8-2 1 0 1 0 0-2-5-2-10-5-11-14 0-5 0-10 1-13 2-5 2-7 2-7s3 0 5 2c2 2 2 4 2 4l2 4c0 0 3 1 5 1h2l1-2c0-2 1-4 4-5 2-1 5-1 7 0 3 1 3 3 3 5l1 2h2c2 0 5-1 5-1s0 2 2 7c1 3 1 8 1 13-1 9-6 12-11 14-1 2-1 2 0 2 2 1 8 1 8 1 2 2 4-1 4-1 1-1 6-5 12 0 5 6 1 15-3 18-4 3-10 5-10 5s-1 1-1 2c0 1 0 6 0 10 0 1 1 2 2 2h11c1 0 2-1 2-2 0-4 0-9 0-10 0-1-1-2-1-2s-5-2-8-5c-6-7-5-15-5-15 3-1 5-1 5-1 0-2-1-3-2-4-2-1-4-1-4-1-1-1-2-1-3-1-4 0-5 0-5 1-6 0-3-2-4-5-4-3 0-5 1-5 1-2 0-4 0-4 1 0 0 2 1 5 1 0 0 1 8-5 15-2 3-8 5-8 5s-1 1-1 2c0 1 0 6 0 10 0 1 1 2 2 2h11c1 0 2-1 2-2 0-4 0-9 0-10 0-1-1-2-1-2Z" fill="#fff"/></svg>',
    color: '#ffffff',
    type: 'Tools'
  },
  {
    name: 'REST APIs',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="34" width="92" height="60" rx="12" fill="#1f2937" stroke="#9ca3af" stroke-width="8"/><circle cx="45" cy="64" r="10" fill="#34d399"/><path d="M64 54h28M64 74h28" stroke="#d1d5db" stroke-width="8" stroke-linecap="round"/><path d="M66 64h16" stroke="#34d399" stroke-width="8" stroke-linecap="round"/></svg>',
    color: '#ffffff',
    type: 'Backend'
  },
  {
    name: 'AI/ML',
    icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="50" fill="#8b5cf6"/><path d="M44 42h40v44H44z" fill="#fff" opacity="0.16"/><path d="M52 52h24M52 64h24M52 76h24" stroke="#fff" stroke-width="8" stroke-linecap="round"/><circle cx="64" cy="90" r="6" fill="#fff"/></svg>',
    color: '#ffffff',
    type: 'Emerging'
  },
];

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = skillsData
    .map((s, i) => `
      <div class="skill-card" style="animation-delay:${i * 50}ms">
        <div class="skill-icon" style="color:${s.color}">${s.icon}</div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-type">${s.type}</div>
      </div>
    `)
    .join('');

}
renderSkills();

/* =====================================================
   PROJECTS: fetch from API, fallback to static
   ===================================================== */
const staticProjects = [
  {
    id: 1,
    title: 'Achiver - Certificate Verification Platform',
    description: 'A secure digital platform for storing, managing, and showcasing certificates. Features real-time verification, shareable links, and a clean dashboard for managing multiple credentials in one place.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
    liveUrl: 'https://dnvba07nlq4dm.cloudfront.net/',
    githubUrl: 'https://github.com/AmanMInz-in/HackTitans-AchievR',
    imageUrl: 'assets/achiver.png',
  },
  {
    id: 2,
    title: 'EventIQ - Event Management System',
    description: 'A centralized event coordination platform featuring multi-role authentication. It provides administrators with complete campus oversight, and club associates with dedicated dashboards to publish, manage, and coordinate student registrations and notices.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'RBAC'],
    liveUrl: 'https://central-event-management-system.vercel.app/',
    githubUrl: 'https://github.com/AmanMInz-in/Central-Event-Management-System',
    imageUrl: 'assets/central 01.png',
  },
  {
    id: 3,
    title: 'SyncLab - Discussion Forum for  Enginneering Students',
    description: 'National-level hackathon submission. Built under 24 hours as a 1st-year student, selected among 300+ teams. Focused on real-world problem solving with a scalable architecture and intuitive UX.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    liveUrl: 'https://amanminz-in.github.io/public-discussion-Forum/index.html',
    githubUrl: 'https://github.com/AmanMInz-in/public-discussion-Forum',
    imageUrl: 'assets/Synclab 01.png',
  },
  {
    id: 4,
    title: 'Tanjiro.CV - AI Resume Generator',
    description: 'A Gemini-integrated AI resume generator and optimizer. It analyzes job descriptions to tailor, format, and optimize candidate resumes with real-time AI suggestions for maximum ATS scoring.',
    tech: ['React.js', 'Node.js', 'Gemini API', 'MongoDB', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=1200&q=80',
  },
];

async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  let projects = staticProjects;

  /*
  // NOTE: Backend is currently NOT deployed. Uncomment this block when you deploy your API.
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) projects = data;
    }
  } catch (err) {
    console.info('Backend not running; using static fallback projects.', err);
  }
  */

  grid.innerHTML = projects
    .map((p, i) => `
      <div class="project-card reveal" style="animation-delay:${i * 80}ms">
        <div class="project-image">
          <img src="${p.imageUrl || 'https://via.placeholder.com/1200x675?text=Project+Preview'}" alt="${p.title} screenshot" loading="lazy" />
        </div>
        <div class="project-header">
          <div class="project-num">Project ${String(i + 1).padStart(2, '0')}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech">
            ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          ${p.liveUrl && p.liveUrl !== '#' ? `
            <a href="${p.liveUrl}" target="_blank" class="project-link" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          ` : ''}
          ${p.githubUrl && p.githubUrl !== '#' ? `
            <a href="${p.githubUrl}" target="_blank" class="project-link" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              Source Code
            </a>
          ` : ''}
        </div>
      </div>
    `)
    .join('');

  // Observe newly added reveal elements
  grid.querySelectorAll('.project-card.reveal').forEach(el => revealObserver.observe(el));
}
loadProjects();

/* =====================================================
   CONTACT FORM
   ===================================================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');
const submitBtn   = document.getElementById('submitBtn');

contactForm && contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  // UI: loading state
  btnText.style.display    = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled       = true;
  formSuccess.style.display = 'none';
  formError.style.display   = 'none';

  const payload = {
    name:    contactForm.name.value.trim(),
    email:   contactForm.email.value.trim(),
    message: contactForm.message.value.trim(),
  };

  // Basic client validation
  if (!payload.name || !payload.email || !payload.message) {
    showFormFeedback('error');
    return;
  }

  /*
  // NOTE: Backend is currently NOT deployed. Uncomment this block when you deploy your API.
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (res.ok) {
      showFormFeedback('success');
      contactForm.reset();
      return;
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    console.warn('Failed to contact live backend:', err);
    // You can handle error fallback here if desired
  }
  */

  // Mock implementation for static demo (runs because live backend is not deployed)
  setTimeout(() => {
    showFormFeedback('success');
    contactForm.reset();
  }, 800);
});

function showFormFeedback(type) {
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  btnText.style.display    = 'inline';
  btnLoading.style.display = 'none';
  submitBtn.disabled       = false;

  if (type === 'success') {
    formSuccess.style.display = 'block';
    formError.style.display   = 'none';
  } else {
    formSuccess.style.display = 'none';
    formError.style.display   = 'block';
  }
}

/* =====================================================
   ACTIVE NAV LINK on scroll
   ===================================================== */
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

/* =====================================================
   PARALLAX: hero glow blobs follow mouse (subtle)
   ===================================================== */
const hero = document.querySelector('.hero');
hero && document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  hero.style.setProperty('--px', `${x}px`);
  hero.style.setProperty('--py', `${y}px`);
});

/* =====================================================
   THEME TOGGLE (Light/Dark Mode)
   ===================================================== */
const themeToggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', initialTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
