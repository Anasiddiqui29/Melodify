import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function Album(){
  const { id } = useParams()
  const [album, setAlbum] = useState<any>(null)

  useEffect(()=>{
    if(!id) return
    api.get(`/music/getAlbum/${id}`).then(r => setAlbum(r.data)).catch(()=>{})
  },[id])

  if(!album) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{album.title || album.name}</h1>
      <div className="space-y-4">
        {(album.tracks || album.musics || []).map((t:any)=> (
          <div key={t._id || t.id} className="p-3 bg-gray-800 rounded flex items-center justify-between">
            <div>
              <div className="font-semibold">{t.title || t.name}</div>
              <div className="text-sm text-gray-400">{t.artistName || t.artist}</div>
            </div>
            <audio controls src={t.url || t.musicUrl} className="w-48" />
          </div>
        ))}
      </div>
    </div>
  )
}
