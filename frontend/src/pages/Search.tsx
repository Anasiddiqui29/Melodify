import React, { useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { useSearchParams , useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Search(){

    // const [query , setQuery] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const urlQuery = searchParams.get('q') || ''
    const [query, setQuery] = useState(urlQuery)

    const [results , setResults] = useState<any>({
        songs: [],
        albums: [],
        artists: []
    })

    const [loading , setLoading] = useState(false)

    const performSearch = async (searchTerm: string) => {

        if (!searchTerm.trim()) return

        try {

        setLoading(true)

        const response = await api.get(
            `/music/search?q=${encodeURIComponent(searchTerm)}`
        )

        setResults({
            songs: response.data.results?.songs || [],
            albums: response.data.results?.albums || [],
            artists: response.data.results?.artists || []
        })

        } catch (error) {

        console.error("Search Error:", error)

        } finally {

        setLoading(false)

        }
    }

    useEffect(() => {

        if (!urlQuery.trim()) return

        setQuery(urlQuery)

        performSearch(urlQuery)

    }, [urlQuery])

    const handleSearch = async (e: React.FormEvent) => {

        // e.preventDefault();

        // if(!query.trim()){
        //     setResults({
        //         songs: [],
        //         albums: [],
        //         artists: []
        //     })
        //     return
        // }
        
        // try {
            
        //     setLoading(true)

        //     const response = await api.get(
        //         `/music/search?q=${encodeURIComponent(query)}`
        //     )

        //     console.log(response.data)

        //     // setResults(response.data.results)
        //     setResults({
        //     songs: response.data.results?.songs || [],
        //     albums: response.data.results?.albums || [],
        //     artists: response.data.results?.artists || []
        // })
        // }catch(error) {

        //     console.error("Search Error: ", error)

        // }finally{
        //     setLoading(false)
        // }

        e.preventDefault()

        if (!query.trim()) return

        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    const hasResults =
    results.songs.length > 0 ||
    results.albums.length > 0 ||
    results.artists.length > 0


  return (
    <div
      className="space-y-10"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >

      {/* Header */}

      <div>

        <p
          className="text-[11px] font-medium tracking-[0.25em] text-[#C9A962] mb-3"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          DISCOVER
        </p>

        <h1
          className="text-[2.25rem] text-[#F3EFE7]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500
          }}
        >
          Search
        </h1>

      </div>


      {/* Search box */}

      <form
        onSubmit={handleSearch}
        className="flex gap-3"
      >

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, albums, artists..."
          className="flex-1 bg-[#131218] border border-[#3A362E] rounded-xl px-5 py-4 text-[#F3EFE7] outline-none focus:border-[#C9A962] transition"
        />

        <button
          type="submit"
          className="px-6 rounded-xl bg-[#C9A962] text-[#0B0B0F] font-semibold hover:opacity-90 transition"
        >
          Search
        </button>

      </form>


      {/* Loading */}

      {loading && (
        <p className="text-[#6B6660]">
          Searching...
        </p>
      )}


      {/* No results */}

      {!loading && query && !hasResults && (
        <div className="text-center py-16">

          <p className="text-[#D8D3C8] text-lg">
            No results found
          </p>

          <p className="text-[#6B6660] text-sm mt-2">
            Try searching for another song, album or artist.
          </p>

        </div>
      )}


      {/* Songs */}

      {!loading && results.songs.length > 0 && (

        <section>

          <h2
            className="text-xl text-[#F3EFE7] mb-4 pb-3 border-b border-[#3A362E]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500
            }}
          >
            Songs
          </h2>

          <div className="space-y-2">

            {results.songs.map((song: any) => (

              <div
                key={song._id}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#131218] border border-[#3A362E]"
              >

                <div className="text-2xl">
                  🎵
                </div>

                <div className="flex-1">

                  <p className="text-[#F3EFE7] font-medium">
                    {song.title}
                  </p>

                  <p className="text-sm text-[#6B6660]">
                    {song.artist?.username || 'Unknown Artist'}
                  </p>

                </div>

                <audio
                  controls
                  preload="metadata"
                  src={song.uri}
                  className="w-64"
                />

              </div>

            ))}

          </div>

        </section>

      )}


      {/* Albums */}

      {!loading && results.albums.length > 0 && (

        <section>

          <h2
            className="text-xl text-[#F3EFE7] mb-4 pb-3 border-b border-[#3A362E]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500
            }}
          >
            Albums
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

            {results.albums.map((album: any) => (

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

        </section>

      )}


      {/* Artists */}

      {!loading && results.artists.length > 0 && (

        <section>

          <h2
            className="text-xl text-[#F3EFE7] mb-4 pb-3 border-b border-[#3A362E]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500
            }}
          >
            Artists
          </h2>

          <div className="space-y-2">

            {results.artists.map((artist: any) => (

              <div
                key={artist._id}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#131218] border border-[#3A362E]"
              >

                <div className="w-12 h-12 rounded-full bg-[#C9A962]/20 flex items-center justify-center">
                  👤
                </div>

                <div>

                  <p className="text-[#F3EFE7] font-medium">
                    {artist.username}
                  </p>

                  <p className="text-sm text-[#6B6660]">
                    Artist
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>
  )


}