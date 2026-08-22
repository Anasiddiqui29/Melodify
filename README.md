# 🎵 Spotify Clone

A full-stack Spotify-inspired music streaming web application built with **React, Vite, Node.js, Express, MongoDB, and ImageKit**.

The application allows users to browse music, artists to upload songs and create albums, and authenticated users to access protected music-related features.

---

## 🚀 Features

### 👤 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Authentication using HTTP-only cookies
* Protected routes
* Role-based authorization
* Separate permissions for:

  * **User**
  * **Artist**

### 🎵 Music

* Browse available songs
* Display music cards
* View music information
* Artist information populated from the database
* Music uploaded by artists
* Cloud-based music storage

### 💿 Albums

* Create albums
* View albums
* View individual album details
* Associate albums with artists

### 🎤 Artist Features

Artists have access to additional functionality:

* Upload music
* Create albums
* Manage artist-specific content

Non-artist users are restricted from accessing artist-only functionality.

### 🛡️ Protected Routes

The frontend uses protected routing to prevent unauthorized access.

For example:

```text
/login
/register
    ↓
Authentication
    ↓
/home
/album/:id
/upload (Artist only)
```

---

## 🏗️ Tech Stack

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **React Router**
* **Tailwind CSS**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **Multer**

### Storage

* **ImageKit** for media storage

---

## 📂 Project Structure

```text
Spotify_Clone/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── MusicCard.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Album.tsx
│   │   │   └── Upload.tsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── ...
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   └── album.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── music.routes.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── services/
│   │   └── storage.service.js
│   │
│   ├── app.js
│   └── server.js
│
└── README.md
```

> The exact structure may vary depending on the final project organization.

---

## 🔐 Authentication Flow

The application uses JWT-based authentication.

### Login Flow

```text
User
 │
 ▼
Login Form
 │
 ▼
POST /api/auth/login
 │
 ▼
Backend validates credentials
 │
 ▼
JWT generated
 │
 ▼
JWT stored in HTTP-only cookie
 │
 ▼
Authenticated User
```

The frontend sends requests using Axios with credentials enabled:

```ts
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})
```

This allows the browser to automatically include the authentication cookie with API requests.

---

## 👥 Role-Based Access

The application supports different user roles.

### User

Regular users can:

* Browse music
* View albums
* Access authenticated pages

### Artist

Artists have all regular user permissions plus:

* Upload music
* Create albums

Artist-only routes are protected using backend authorization middleware.

Example:

```js
router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic
);
```

---

## 🎼 Music API

### Get All Music

```http
GET /api/music
```

Returns available music.

Example response:

```json
{
  "message": "Music fetched successfully",
  "music": []
}
```

The backend currently limits the homepage response to a fixed number of songs:

```js
const musics = await musicModel
    .find()
    .limit(10)
    .populate("artist", "username email");
```

### Upload Music

```http
POST /api/music/upload
```

Artist-only endpoint.

The music file is uploaded using `multipart/form-data`.

The expected file field is:

```text
music
```

### Create Album

```http
POST /api/music/album
```

Artist-only endpoint.

### Get Albums

```http
GET /api/music/getAlbum
```

### Get Album By ID

```http
GET /api/music/getAlbum/:albumId
```

---

## 🗄️ Database

MongoDB is used as the primary database.

Mongoose provides the schema and database interaction layer.

The main collections/models include:

```text
Users
Music
Albums
```

Music documents reference artists using MongoDB ObjectIds.

Artist information is retrieved using Mongoose's `populate()`:

```js
.populate("artist", "username email")
```

---

## ☁️ Media Storage

Music files are uploaded using **Multer** with memory storage:

```js
const upload = multer({
    storage: multer.memoryStorage()
});
```

The uploaded file is then processed and stored using ImageKit.

This keeps large media files out of the MongoDB database while storing the required metadata and media URL/reference in the database.

---

## 🖥️ Frontend Routing

React Router is used for client-side navigation.

### Public Routes

```text
/login
/register
```

### Protected Routes

```text
/home
/album/:id
```

### Artist Route

```text
/upload
```

Unauthenticated users attempting to access protected routes are redirected to:

```text
/login
```

Non-artist users attempting to access artist-only pages are redirected to:

```text
/home
```

---

## 🎨 UI

The frontend is built using React and Tailwind CSS.

The authentication pages use a dedicated visual layout with a full-screen background, while authenticated application pages use the main application layout and navigation bar.

The application follows a component-based architecture with reusable components such as:

* Navbar
* Music Card
* Forms
* Protected Route wrappers

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>

cd Spotify_Clone
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> Never commit your `.env` file to GitHub.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
```

---

## ▶️ Running the Application

### Start Backend

From the backend directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### Start Frontend

From the frontend directory:

```bash
npm run dev
```

Vite will provide the local development URL, typically:

```text
http://localhost:5173
```

---

## 🔄 Application Flow

```text
                    ┌──────────────┐
                    │    User      │
                    └──────┬───────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Login / Register│
                  └────────┬────────┘
                           │
                           ▼
                    JWT Authentication
                           │
                           ▼
                  ┌─────────────────┐
                  │  React Frontend │
                  └────────┬────────┘
                           │
                           ▼
                    Axios API Calls
                           │
                           ▼
                  ┌─────────────────┐
                  │ Express Backend │
                  └────────┬────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
          ┌──────────┐          ┌──────────┐
          │ MongoDB  │          │ ImageKit │
          └──────────┘          └──────────┘
                │                     │
                └──────────┬──────────┘
                           ▼
                    Music / Album Data
                           │
                           ▼
                  ┌─────────────────┐
                  │  React Frontend │
                  └─────────────────┘
```

---

## 🔮 Future Improvements

Some planned improvements include:

* [ ] Music player with play/pause controls
* [ ] Audio progress bar
* [ ] Volume control
* [ ] Previous/next song controls
* [ ] Playlist creation
* [ ] User-created playlists
* [ ] Search functionality
* [ ] Music recommendations
* [ ] Artist profiles
* [ ] Album management
* [ ] Pagination / infinite scrolling
* [ ] Recently played songs
* [ ] Like/favorite functionality
* [ ] Improved responsive design
* [ ] Production deployment
* [ ] Improved error handling
* [ ] Loading states and skeleton UI

---

## 🎯 Learning Objectives

This project was developed to gain practical experience with:

* Full-stack web development
* React and component-based architecture
* REST API development
* Authentication and authorization
* JWT and HTTP-only cookies
* MongoDB and Mongoose
* Role-based access control
* File uploads with Multer
* Cloud media storage
* API integration using Axios
* React Router
* Protected frontend routes
* Backend middleware
* MVC-style backend architecture

---

## 👨‍💻 Author

**Anas Siddiqui**

Built as a full-stack learning project inspired by Spotify's music streaming experience.

---

## ⚠️ Disclaimer

This project is a **Spotify-inspired educational project** and is not affiliated with or endorsed by Spotify.

No copyrighted Spotify assets or proprietary services are intended to be replicated.


