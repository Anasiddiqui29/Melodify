import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Album from './pages/Album'
import Upload from './pages/Upload'
import Navbar from './components/Navbar'

import { useAuth } from './context/AuthContext'


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated , isLoading } = useAuth()

  if(isLoading){
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}


function ArtistRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'artist') {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}


/*
  Layout for authenticated pages.
  Navbar will only appear on pages using this layout.
*/
function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0B0B0F]">

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

    </div>
  )
}


export default function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC / AUTH PAGES
          ========================= */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/verify-email/:token"
        element={<VerifyEmail />}
      />

      <Route 
        path="/forgot-password"
        element = {<ForgotPassword />}
      />

      <Route 
        path="/reset-password/:token"
        element = {<ResetPassword />}
      />

      {/* =========================
          APPLICATION LAYOUT
          ========================= */}

      <Route element={<AppLayout />}>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/album/:id"
          element={
            <ProtectedRoute>
              <Album />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ArtistRoute>
              <Upload />
            </ArtistRoute>
          }
        />

      </Route>


      {/* =========================
          FALLBACK
          ========================= */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  )
}