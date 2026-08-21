import React, { useState } from 'react'
import api from '../api'

export default function Upload(){
  const [title,setTitle] = useState('')
  const [file,setFile] = useState<File | null>(null)

  const submit = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!file) return alert('Choose a file')
    const form = new FormData()
    form.append('music', file)
    form.append('title', title)

    try{
      await api.post('/music/upload', form, { headers: {'Content-Type':'multipart/form-data'} })
      alert('Uploaded')
    }catch(e){
      alert('Upload failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Music</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-2 rounded bg-gray-900" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="file" accept="audio/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button className="w-full bg-indigo-600 py-2 rounded">Upload</button>
      </form>
    </div>
  )
}
