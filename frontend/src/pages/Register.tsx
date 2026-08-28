import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [registered, setRegistered] = useState(false)

  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post('/auth/register', {
        username,
        email,
        password
      })

      // Don't log the user in.
      // Show the email verification screen instead.
      setRegistered(true)

    } catch (err) {
      alert('Register failed')
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="w-full max-w-md">

        {/* Mark + heading */}
        <div className="text-center mb-9">

          <div className="inline-flex items-center justify-center mb-6">

            <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
              <circle
                cx="28"
                cy="28"
                r="27"
                fill="#0B0B0F"
                stroke="#C9A962"
                strokeWidth="1"
              />

              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#C9A962"
                strokeOpacity="0.25"
                strokeWidth="0.75"
              />

              <circle
                cx="28"
                cy="28"
                r="17"
                stroke="#C9A962"
                strokeOpacity="0.35"
                strokeWidth="0.75"
              />

              <circle
                cx="28"
                cy="28"
                r="12"
                stroke="#C9A962"
                strokeOpacity="0.45"
                strokeWidth="0.75"
              />

              <circle
                cx="28"
                cy="28"
                r="7"
                fill="#C9A962"
              />

              <circle
                cx="28"
                cy="28"
                r="1.4"
                fill="#0B0B0F"
              />
            </svg>

          </div>

          <p
            className="text-[11px] font-medium tracking-[0.25em] text-[#C9A962] mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            MELODIFY
          </p>

          <h1
            className="text-[2.25rem] leading-tight text-[#F3EFE7] mb-3"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500
            }}
          >
            Join the label
          </h1>

          <p className="text-[#A39D91] text-[15px]">
            Create an account to start listening — or uploading.
          </p>

        </div>


        {/* Card */}
        <div className="bg-[#131218]/80 backdrop-blur-xl border border-[#C9A962]/15 rounded-2xl p-8 shadow-2xl shadow-black/40">

          {registered ? (

            /* =========================
               EMAIL VERIFICATION SCREEN
               ========================= */

            <div className="text-center py-6">

              <div className="text-5xl mb-6">
                📩
              </div>

              <h2
                className="text-2xl text-[#F3EFE7] mb-3"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500
                }}
              >
                Check your email
              </h2>

              <p className="text-[#A39D91] text-sm leading-6 mb-2">
                We've sent a verification link to:
              </p>

              <p className="text-[#C9A962] font-medium mb-6">
                {email}
              </p>

              <p className="text-[#6B6660] text-sm leading-6 mb-7">
                Please verify your email address before signing in.
                The verification link will expire in 30 minutes.
              </p>

              <button
                onClick={() => navigate('/login')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A962] to-[#E4C989] text-[#0B0B0F] font-semibold"
              >
                Go to Login
              </button>

            </div>

          ) : (

            /* =========================
               REGISTRATION FORM
               ========================= */

            <>
              <form onSubmit={submit} className="space-y-5">

                {/* Username */}
                <div>

                  <label className="block text-[13px] font-medium text-[#D8D3C8] mb-2">
                    Username
                  </label>

                  <div className="relative">

                    <svg
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#6B6660]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.6}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
                      />
                    </svg>

                    <input
                      type="text"
                      placeholder="yourname"
                      value={username}
                      onChange={e => setName(e.target.value)}
                      required
                      autoComplete="username"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0B0B0F] border border-[#3A362E] text-[#F3EFE7] placeholder-[#5C574F] outline-none transition-all duration-200 focus:border-[#C9A962]/60 focus:ring-2 focus:ring-[#C9A962]/15"
                    />

                  </div>

                </div>


                {/* Email */}
                <div>

                  <label className="block text-[13px] font-medium text-[#D8D3C8] mb-2">
                    Email address
                  </label>

                  <div className="relative">

                    <svg
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#6B6660]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.6}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0B0B0F] border border-[#3A362E] text-[#F3EFE7] placeholder-[#5C574F] outline-none transition-all duration-200 focus:border-[#C9A962]/60 focus:ring-2 focus:ring-[#C9A962]/15"
                    />

                  </div>

                </div>


                {/* Password */}
                <div>

                  <label className="block text-[13px] font-medium text-[#D8D3C8] mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <svg
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#6B6660]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.6}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>

                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#0B0B0F] border border-[#3A362E] text-[#F3EFE7] placeholder-[#5C574F] outline-none transition-all duration-200 focus:border-[#C9A962]/60 focus:ring-2 focus:ring-[#C9A962]/15"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6660] hover:text-[#C9A962] transition-colors focus-visible:outline-none focus-visible:text-[#C9A962]"
                    >

                      {showPassword ? (

                        <svg
                          className="w-[18px] h-[18px]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.6}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                          />
                        </svg>

                      ) : (

                        <svg
                          className="w-[18px] h-[18px]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.6}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.6}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>

                      )}

                    </button>

                  </div>

                </div>


                {/* Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A962] to-[#E4C989] text-[#0B0B0F] font-semibold shadow-lg shadow-[#C9A962]/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#C9A962]/20 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131218]"
                >
                  Sign Up
                </button>

              </form>


              {/* Divider */}
              <div className="flex items-center gap-4 my-6">

                <div className="h-px flex-1 bg-[#3A362E]" />

                <span
                  className="text-[11px] tracking-[0.2em] text-[#6B6660]"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace"
                  }}
                >
                  OR
                </span>

                <div className="h-px flex-1 bg-[#3A362E]" />

              </div>


              {/* Login */}
              <p className="text-center text-sm text-[#A39D91]">

                Already have an account?{' '}

                <button
                  onClick={() => navigate('/login')}
                  className="text-[#C9A962] hover:text-[#E4C989] font-medium transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Sign in
                </button>

              </p>

            </>

          )}

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-[#5C574F] mt-7">
          Curated sound, whenever you're ready.
        </p>

      </div>
    </div>
  )
}

