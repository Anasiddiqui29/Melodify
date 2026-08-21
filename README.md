# Spotify-Clone

This repository contains a Node/Express backend and a React + Vite frontend (scaffolded).

Backend (existing):
- Run from repository root
- Start with: npm run dev (uses nodemon)

Frontend (new, under frontend/):
- Install dependencies: cd frontend && npm install
- Start dev server: npm run dev
- Frontend will run on http://localhost:5173 and talk to backend at http://localhost:3000/api

Notes and next steps:
- CORS support added to backend (allowed origin: http://localhost:5173)
- Fixed auth route and logout bug to match controller exports
- The frontend is a minimal modern UI (React + TypeScript + Tailwind). It includes pages for Home, Login, Register, Album and Upload and a simple API client (src/api.ts)

