import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function Album(){
    const { id } = useParams()
    const [album, setAlbum] = useState<any>(null)
    const [loading , setLoading] = useState(true)

    useEffect(() => {

      if(!id) return 

      api.get(`/music/getAlbum/${id}`)
        .then((response) => {
          setAlbum(response.data.album)
        })
        .catch((error) => {
          console.error("Error Fetching Album: ",error)
        })
        .finally(() => {
          setLoading(false)
        })

    },[id])

    if(loading){
      return (
        <div className="text-gray-400">
          Loading album...
        </div>
      )
    }

    if (!album) {
      return (
        <div className="text-gray-400">
          Album not found.
        </div>
      )
    }

  return (
    <div className="space-y-8">

      {/* Album Header */}

      <div className="flex items-end gap-6">

        <img
          src={album.coverImage}
          alt={album.title}
          className="w-52 h-52 object-cover rounded-lg shadow-lg"
        />

        <div>

          <p className="text-sm text-gray-400 uppercase">
            Album
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            {album.title}
          </h1>

          <p className="text-gray-400 mt-3">
            {album.artist?.username}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {album.music?.length || 0} songs
          </p>

        </div>

      </div>


      {/* Songs */}

      <div className="space-y-3">

        {album.music?.map((music: any, index: number) => (

          <div
            key={music._id}
            className="flex items-center gap-4 p-4 rounded-lg bg-[#15151C] hover:bg-[#1D1D25] transition"
          >

            {/* Track number */}

            <div className="w-8 text-center text-gray-500">
              {index + 1}
            </div>


            {/* Song information */}

            <div className="flex-1">

              <p className="font-semibold text-white">
                {music.title}
              </p>

              <p className="text-sm text-gray-400">
                {music.artist?.username}
              </p>

            </div>


            {/* Audio */}

            <audio
              controls
              src={music.uri}
              className="w-64"
            />

          </div>

        ))}

      </div>

    </div>
  )


}
