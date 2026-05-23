# Aman Minz — Developer Portfolio

A premium developer portfolio showcasing modern UI, responsive layout, and a polished web experience.
This project combines a static `frontend/` website with an optional Node.js/Express `backend/` API.

---

## Overview

This repository contains a complete portfolio system built for polished presentation and easy customization.
It is ideal for demonstrating projects, skills, contact integration, and a refined brand identity.

- `frontend/` – static portfolio interface with responsive design and JavaScript-powered content.
- `backend/` – lightweight Express server exposing project data and contact form handling.
- `docs/` – setup and deployment documentation.

---

## Project Structure

```text
aman-minz-portfolio/
├── backend/                    # Express server and API logic
│   ├── package.json            # Backend dependencies and scripts
│   ├── server.js               # API routes, project data, contact endpoint
│   └── .env.example            # Environment variable template
├── docs/                       # Documentation and setup guides
│   └── SETUP.md
├── frontend/                   # Static portfolio website assets
│   ├── index.html              # Main HTML page
│   ├── style.css               # Visual styles and layout
│   └── app.js                  # Frontend rendering, scrolling, and API integration
└── README.md                   # Project summary and usage instructions
```

---

## Key Features

- Fully responsive portfolio layout
- Modern dark design with premium typography
- Project gallery with live/demo links
- Contact form support via backend API
- Smooth scroll and reveal animation effects
- Optional backend integration with Express

---

## Getting Started

### Run frontend only

The frontend works as a static website and can be opened directly in a browser.
For local development, use a simple static server:

```bash
npx serve frontend
```

### Run frontend with backend

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Start the backend server:

```bash
npm run dev
```

4. Open `frontend/index.html` in your browser, or serve the frontend from the same host.

---

## Backend API

The backend exposes the following endpoints:

| Method | Route               | Description                          |
|--------|---------------------|--------------------------------------|
| GET    | `/`                 | Health check                         |
| GET    | `/api/projects`     | Retrieve all portfolio projects      |
| GET    | `/api/projects/:id` | Retrieve a single project by ID      |
| POST   | `/api/contact`      | Submit contact form data             |

### Example contact payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to collaborate on a project."
}
```

---

## Customization

To personalize the portfolio:

- Update the hero image and profile section in `frontend/index.html`
- Replace placeholder text and social links with your own information
- Update project entries in `backend/server.js`
- Adjust color tokens and typography in `frontend/style.css`
- Set `CLIENT_ORIGIN` and other environment variables in `backend/.env`

---

## Deployment Recommendations

- Frontend: Vercel, Netlify, GitHub Pages
- Backend: Render, Railway, Fly.io

For a fully deployed portfolio, host the frontend on a static hosting provider and deploy the backend API separately.

---

## Author

**Aman Minz**

Contact: `amanminz.cs@gmail.com`

B.Tech in Computer Science (AI/ML) | CCET Bhilai

