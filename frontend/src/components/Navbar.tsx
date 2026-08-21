import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {

  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0F]/90 backdrop-blur-xl border-b border-[#C9A962]/15 text-[#F3EFE7] shadow-lg shadow-black/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2.5 group"
        >
          <svg
            className="w-7 h-7 shrink-0"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle cx="28" cy="28" r="27" fill="#0B0B0F" stroke="#C9A962" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="17" stroke="#C9A962" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="28" cy="28" r="7" fill="#C9A962" />
            <circle cx="28" cy="28" r="1.4" fill="#0B0B0F" />
          </svg>

          <span
            className="text-xl text-[#F3EFE7] tracking-tight group-hover:text-[#E4C989] transition-colors"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            Spotify Clone
          </span>
        </Link>

        <nav className="flex items-center space-x-2">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#D8D3C8] hover:text-[#F3EFE7] hover:bg-[#C9A962]/10 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3.5 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#C9A962] to-[#E4C989] text-[#0B0B0F] hover:shadow-md hover:shadow-[#C9A962]/20 transition-all"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/home"
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#D8D3C8] hover:text-[#F3EFE7] hover:bg-[#C9A962]/10 transition-colors"
              >
                Home
              </Link>

              {user?.role === 'artist' && (
                <Link
                  to="/upload"
                  className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#D8D3C8] hover:text-[#F3EFE7] hover:bg-[#C9A962]/10 transition-colors"
                >
                  Upload
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-full text-sm font-semibold border border-[#C9A962]/40 text-[#C9A962] hover:bg-[#C9A962]/10 hover:border-[#C9A962]/60 transition-colors"
              >
                Logout
              </button>
            </>
          )}

        </nav>
      </div>
    </header>
  )
}