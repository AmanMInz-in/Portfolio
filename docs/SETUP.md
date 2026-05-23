# Setup & Deployment Guide

## Local Development

### Prerequisites
- Node.js v18 or higher (`node -v` to check)
- A modern browser (Chrome, Firefox, Edge, Safari)

---

### Step 1 — Clone / Unzip

Unzip `aman-minz-portfolio.zip` into your working directory:
```bash
unzip aman-minz-portfolio.zip
cd aman-minz-portfolio
```

---

### Step 2 — Run the Frontend

No build step is needed. You can either:

**Option A — Open directly:**
```bash
open frontend/index.html
# Windows: start frontend/index.html
```

**Option B — Serve with a static server (recommended, avoids CORS issues):**
```bash
npx serve frontend
# Runs at http://localhost:3000
```

---

### Step 3 — Run the Backend

```bash
cd backend

# 1. Copy environment template
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Start development server (auto-restarts on file changes)
npm run dev

# OR start in production mode
npm start
```

The API will be live at `http://localhost:3001`.

---

### Step 4 — Connect Frontend to Backend

In `frontend/app.js`, line 6, the `API_BASE` constant points to the backend:

```js
const API_BASE = 'http://localhost:3001/api';
```

Change this to your deployed backend URL before going live.

---

## Adding a Real Profile Photo

In `frontend/index.html`, find the `.photo-placeholder` div and replace it:

```html
<!-- Replace the entire .photo-placeholder div with: -->
<img
  src="assets/profile.jpg"
  alt="Aman Minz"
  class="photo-placeholder"
  style="object-fit:cover;"
/>
```

Then add to `frontend/style.css`:
```css
img.photo-placeholder {
  width: 280px;
  height: 280px;
  border-radius: 36% 64% 54% 46% / 40% 38% 62% 60%;
  animation: morphBlob 8s ease-in-out infinite;
}
```

---

## Enabling Contact Emails (Nodemailer)

Install Nodemailer in the backend:
```bash
cd backend
npm install nodemailer
```

Add to `backend/.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=amanminz.cs@gmail.com
```

In `backend/server.js`, after the validation block in `POST /api/contact`, add:
```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

await transporter.sendMail({
  from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
  to:   process.env.CONTACT_TO,
  subject: `New message from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
});
```

---

## Deployment

### Frontend → Vercel
```bash
npm i -g vercel
cd frontend
vercel --prod
```

### Frontend → Netlify
```bash
npm i -g netlify-cli
netlify deploy --dir frontend --prod
```

### Backend → Render
1. Push `backend/` folder to a GitHub repo
2. Create a new **Web Service** on render.com
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add environment variables from `.env.example`

### Backend → Railway
```bash
npm i -g @railway/cli
cd backend
railway login
railway init
railway up
```

---

## Environment Variables Reference

| Variable           | Default | Description                            |
|--------------------|---------|----------------------------------------|
| `PORT`             | `3001`  | Server port                            |
| `CLIENT_ORIGIN`    | `*`     | Allowed CORS origin (set in production)|
| `ACHIVER_LIVE_URL` | —       | Live URL for Achiver project           |
| `ACHIVER_GITHUB_URL`| —      | GitHub URL for Achiver                 |
| `EVENT_LIVE_URL`   | —       | Live URL for Event Management          |
| `EVENT_GITHUB_URL` | —       | GitHub URL for Event Management        |
| `HACK_GITHUB_URL`  | —       | GitHub URL for HackOMania project      |
| `SMTP_HOST`        | —       | SMTP host (optional, for emails)       |
| `SMTP_PORT`        | `587`   | SMTP port                              |
| `SMTP_USER`        | —       | SMTP username                          |
| `SMTP_PASS`        | —       | SMTP app password                      |
| `CONTACT_TO`       | —       | Recipient email for contact form       |
