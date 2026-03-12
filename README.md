# Krishnaraj Portfolio (MERN)

Modern, responsive full-stack developer portfolio built with:
- Frontend: React, React Router, plain CSS, Framer Motion
- Backend: Node.js, Express, MongoDB (Mongoose)

## Folder Structure

```text
portfolio/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    public/
    src/
      components/
      data/
      hooks/
      sections/
      App.jsx
      index.css
      main.jsx
    .env.example
    index.html
    package.json
    vite.config.js
```

## Run Locally

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend default: `http://localhost:5000`
Set `ADMIN_KEY` in `backend/.env` for admin panel authentication.
Project images uploaded from admin are served from: `http://localhost:5000/uploads/<filename>`

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend default: `http://localhost:5173`
Admin panel: `http://localhost:5173/admin`

## Seed Skills

This seeds your configured skills list into MongoDB.

```bash
cd backend
npm run seed:skills
```

## Seed Projects

This seeds your project list into MongoDB.

```bash
cd backend
npm run seed:projects
```

## Deploy To Render + MongoDB Atlas

This repo now includes a Render Blueprint file at `render.yaml` to deploy both:
- `krishnaraj-portfolio-api` (Node backend)
- `krishnaraj-portfolio-web` (Vite static frontend)

### 1) Prepare MongoDB Atlas

1. Create a cluster in Atlas.
2. Create a DB user and password.
3. In Atlas Network Access, allow Render IP access (for quick start you can allow `0.0.0.0/0` and tighten later).
4. Copy your connection string and set it as `MONGO_URI` in Render backend env vars.

### 2) Deploy On Render

1. Push this repo to GitHub.
2. In Render, click New + > Blueprint and select this repo.
3. Render detects `render.yaml` and creates backend + frontend services.
4. Set required env vars:

Backend (`krishnaraj-portfolio-api`):
- `MONGO_URI` = your Atlas connection string
- `ADMIN_KEY` = strong secret key for `/admin`
- `CLIENT_URLS` = comma-separated allowed frontend URLs (for example: `https://krishnaraj-portfolio-web.onrender.com,http://localhost:5173`)
- `SMTP_*` and `CONTACT_RECEIVER_EMAIL` only if contact email sending is enabled

Frontend (`krishnaraj-portfolio-web`):
- `VITE_API_BASE_URL` = your backend URL (example: `https://krishnaraj-portfolio-api.onrender.com`)

### 3) Verify Production

1. Open backend health URL: `/api/health`
2. Open frontend URL and test:
- Projects/skills loading
- Contact form submit
- Admin login + create/edit/delete actions

### Important Note About Image Uploads

Project image uploads are currently stored on backend local disk (`/uploads`). On Render free web services this storage is ephemeral and can be lost on redeploy/restart.

For production, use one of these:
- Store image URLs from Cloudinary/S3 in admin form
- Add persistent external object storage for uploads
