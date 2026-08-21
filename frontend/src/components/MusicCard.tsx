import React from 'react'

type Props = {
  id: string
  title: string
  artist?: string
  uri: string
  cover?: string
}

export default function MusicCard({
  title,
  artist,
  uri,
  cover
}: Props) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all duration-300 border border-gray-700/50">

      {/* Cover */}
      <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl">
            🎵
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">

        <h3 className="text-lg font-semibold text-white truncate">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {artist || 'Unknown Artist'}
        </p>

        {/* Audio Player */}
        <div className="mt-4">
          <audio
            controls
            preload="metadata"
            className="w-full"
            src={uri}
          />
        </div>

      </div>
    </div>
  )
}
