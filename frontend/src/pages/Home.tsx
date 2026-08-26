import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import MusicCard from '../components/MusicCard'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()
  const [musics, setMusics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [albums , setAlbums] = useState<any[]>([])
  const [albumLoading , setAlbumLoading] = useState(true)

  useEffect(() => {
    api.get('/music')
      .then(r => setMusics(r.data.music || []))
      .catch(() => {})
      .finally(() => setLoading(false))

    api.get('/music/getAlbum')
      .then(r => setAlbums(r.data.albums || []))
      .catch(() => {})
      .finally(() => setAlbumLoading(false))
    
  }, [])

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Welcome header */}
      <div className="mb-10">
        <p
          className="text-[11px] font-medium tracking-[0.25em] text-[#C9A962] mb-3"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {user?.role === 'artist' ? 'ARTIST DASHBOARD' : 'WELCOME BACK'}
        </p>

        <h1
          className="text-[2.25rem] leading-tight text-[#F3EFE7] mb-2"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          {user?.username ? `Good to see you, ${user.username}` : 'Discover'}
        </h1>

        <p className="text-[#A39D91] text-[15px]">
          {user?.role === 'artist'
            ? 'Here\u2019s what\u2019s playing across the catalog.'
            : 'Fresh tracks, picked for tonight.'}
        </p>
      </div>
    
    {/* Albums */}
    <div className="mb-12">

    <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[#3A362E]">

      <h2
        className="text-xl text-[#F3EFE7]"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
      >
        Albums
      </h2>

      {!albumLoading && (
        <span
          className="text-xs text-[#6B6660] tracking-wide"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {albums.length} {albums.length === 1 ? 'ALBUM' : 'ALBUMS'}
        </span>
      )}

    </div>


    {/* Loading */}

    {albumLoading && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-[#131218] border border-[#3A362E] animate-pulse"
          />
        ))}

      </div>
    )}


      {/* Albums */}

      {!albumLoading && albums.length > 0 && (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

          {albums.map((album) => (

            <Link
              key={album._id}
              to={`/album/${album._id}`}
              className="group"
            >

              <div className="aspect-square rounded-xl overflow-hidden bg-[#15151C] border border-[#3A362E]">

                {album.coverImage ? (

                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🎵
                  </div>

                )}

              </div>


              <h3 className="mt-3 text-[#F3EFE7] font-medium truncate">
                {album.title}
              </h3>

              <p className="text-sm text-[#6B6660] mt-1 truncate">
                {album.artist?.username || 'Unknown Artist'}
              </p>

            </Link>

          ))}

        </div>

      )}

      </div>

      {/* Section header */}
      <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[#3A362E]">
        <h2
          className="text-xl text-[#F3EFE7]"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          On rotation
        </h2>

        {!loading && (
          <span
            className="text-xs text-[#6B6660] tracking-wide"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {musics.length} {musics.length === 1 ? 'TRACK' : 'TRACKS'}
          </span>
        )}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-[#131218] border border-[#3A362E] animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && musics.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-[#C9A962]/15 bg-[#131218]/60">
          <svg className="w-10 h-10 mb-4" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" fill="#0B0B0F" stroke="#C9A962" strokeOpacity="0.5" strokeWidth="1" />
            <circle cx="28" cy="28" r="7" fill="#C9A962" fillOpacity="0.5" />
          </svg>
          <p className="text-[#D8D3C8] font-medium mb-1">Nothing here yet</p>
          <p className="text-[#6B6660] text-sm">
            {user?.role === 'artist' ? 'Upload a track to get started.' : 'Check back once artists start posting.'}
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && musics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {musics.map(m => (
            <MusicCard
              key={m._id || m.id}
              id={m._id || m.id}
              title={m.title || m.name}
              artist={m.artist?.username || "Unknown Artist"}
              uri={m.uri}
            />
          ))}
        </div>
      )}

    </div>
  )
}
