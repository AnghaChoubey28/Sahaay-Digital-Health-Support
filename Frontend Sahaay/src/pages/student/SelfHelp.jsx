import { useEffect, useMemo, useState } from 'react'

const videos = [
  { id: 'breath5', yt: 'inpok4MKVLM', title: 'Mindful Breathing', tag: 'Meditation' },
  { id: 'ground321', yt: 'tEmt1Znux58', title: 'Grounding Exercise', tag: 'Exercise' },
  { id: 'motivation', mp4: 'https://cdn.pixabay.com/vimeo/147015082/bird-1860.mp4', title: 'Motivation Boost', tag: 'Motivation' },
]

const sounds = [
  { id: 'rain', title: 'Gentle Rain', url: 'https://cdn.pixabay.com/download/audio/2023/02/28/audio_2d2a0aa9c9.mp3' },
  { id: 'piano', title: 'Soft Piano', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1c8e3a3f33.mp3' },
]

export function SelfHelp() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [filter, setFilter] = useState('All')
  const [mood, setMood] = useState(() => Number(localStorage.getItem('mood') || 5))

  useEffect(()=>{
    localStorage.setItem('mood', mood)
  }, [mood])

  const filteredVideos = useMemo(()=>{
    return videos.filter(v => filter === 'All' || v.tag === filter)
  }, [filter])

  return (
    <div className="grid" style={{gap:24}}>

      {/* Video section */}
      <section className="card">
        <h2>Self Help Library</h2>

        <select value={filter} onChange={e=>setFilter(e.target.value)}>
          {['All','Meditation','Exercise','Motivation'].map(v => (
            <option key={v}>{v}</option>
          ))}
        </select>

        <div className="grid grid-3" style={{marginTop:12}}>
          {filteredVideos.map(v => (
            <div key={v.id} className="card">
              <h4>{v.title}</h4>
              <p className="pill">{v.tag}</p>
              <button className="btn" onClick={()=>setActiveVideo(v)}>Open</button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeVideo && (
        <div className="modal-backdrop" onClick={()=>setActiveVideo(null)}>
          <div className="card modal" onClick={e=>e.stopPropagation()}>
            <h3>{activeVideo.title}</h3>

            <div style={{marginTop:10}}>
              {activeVideo.mp4 ? (
                <video
                  controls
                  style={{
                    width:'100%',
                    borderRadius:12,
                    background:'var(--panel-2)'
                  }}
                >
                  <source src={activeVideo.mp4} />
                </video>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.yt}`}
                  style={{width:'100%', height:250, border:0}}
                />
              )}
            </div>

            <button className="btn" onClick={()=>setActiveVideo(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sounds */}
      <section className="card">
        <h3>Calming Sounds</h3>

        <div className="grid grid-2">
          {sounds.map(s => (
            <div key={s.id} className="card">
              <h4>{s.title}</h4>
              <audio controls src={s.url} style={{width:'100%'}} />
            </div>
          ))}
        </div>
      </section>

      {/* Mood */}
      <section className="card">
        <h3>Mood Tracker</h3>

        <p>Current mood: {mood}/10</p>

        <input
          type="range"
          min="0"
          max="10"
          value={mood}
          onChange={e=>setMood(Number(e.target.value))}
        />

        <button
          className="btn"
          onClick={()=>{
            const logs = JSON.parse(localStorage.getItem('moodLogs') || '[]')
            logs.push({ mood, time: Date.now() })
            localStorage.setItem('moodLogs', JSON.stringify(logs))
          }}
        >
          Save
        </button>
      </section>

    </div>
  )
}