# 🎵 Melodify

A full-stack Spotify-inspired music streaming web application. Users can browse music and albums, while authenticated artists can upload songs and manage albums — all secured with JWT-based, role-based authentication.

## Tech Stack

**Frontend:** React, TypeScript, Vite, React Router, Tailwind CSS, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer
**Storage:** ImageKit (cloud media storage)

## Key Features

- **Authentication & Authorization** — JWT-based auth via HTTP-only cookies, with role-based access control for `User` and `Artist` roles
- **Music & Albums** — Browse songs, view album details, and see artist info populated from the database
- **Artist Tools** — Artists can upload music and create albums; access is restricted for regular users via backend middleware
- **Protected Routing** — Frontend route guards redirect unauthenticated users to `/login` and non-artists away from artist-only pages
- **Cloud Media Storage** — Songs are uploaded via Multer and stored on ImageKit, keeping large files out of the database

## API Overview

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/register` | Public |
| GET | `/api/music` | Authenticated |
| POST | `/api/music/upload` | Artist only |
| POST | `/api/music/album` | Artist only |
| GET | `/api/music/getAlbum` | Authenticated |
| GET | `/api/music/getAlbum/:albumId` | Authenticated |

## Email Services

Melodify uses **Nodemailer** to handle transactional emails for authentication and account-related functionality:

- **Email verification** — sent to users after registration
- **Password reset** — sent when a user requests to reset their password
- **Password reset confirmation** — sent after a successful password reset

Nodemailer is configured on the backend and sends these emails through the configured email service.

## Getting Started

```bash
# Clone the repo
git clone <your-repository-url>
cd Spotify_Clone

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Run both servers in development mode:

```bash
# Backend (http://localhost:3000)
cd backend && npm run dev

# Frontend (http://localhost:5173)
cd frontend && npm run dev
```

## Roadmap

- Music player (play/pause, progress bar, volume, next/prev)
- Playlists and liked songs
- Search and recommendations
- Artist profiles and pagination
- Production deployment

## Author

**Anas Siddiqui**
Aspiring Software Engineer

---
*This is an educational project inspired by Spotify. Not affiliated with or endorsed by Spotify.*


