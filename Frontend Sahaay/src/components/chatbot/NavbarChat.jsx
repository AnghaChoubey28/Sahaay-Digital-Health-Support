import { useEffect, useMemo, useRef, useState } from 'react'
import { AIAPI } from '../../services/api.js'
import { useAuth } from '../../context/AuthContext.jsx'

function loadSessions(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}
function saveSessions(key, s) { localStorage.setItem(key, JSON.stringify(s)) }

export function NavbarChat() {
  const { user } = useAuth()
  const storageKey = user?.id ? `hl_chat_sessions:${user.id}` : null

  const [open, setOpen] = useState(false)
  const [sessions, setSessions] = useState(() => storageKey ? loadSessions(storageKey) : [])
  const [activeId, setActiveId] = useState(() => sessions[0]?.id || null)
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(()=>{
    if (storageKey) {
      const loaded = loadSessions(storageKey)
      setSessions(loaded)
      setActiveId(loaded[0]?.id || null)
    } else {
      setSessions([])
      setActiveId(null)
    }
  }, [storageKey])

  useEffect(()=>{
    if (storageKey) saveSessions(storageKey, sessions)
  }, [sessions, storageKey])

  useEffect(()=>{
    if (!activeId && sessions[0]) setActiveId(sessions[0].id)
  }, [sessions, activeId])

  useEffect(()=>{
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [sessions, activeId])

  const activeSession = useMemo(
    ()=> sessions.find(s=>s.id===activeId) || null,
    [sessions, activeId]
  )

  function newSession() {
    const s = {
      id: 's_'+Date.now(),
      title: 'New session',
      createdAt: Date.now(),
      messages: [
        { id: 1, role: 'assistant', content: "Hi! I'm your Sahaay assistant. How can I help?" }
      ]
    }
    setSessions(prev=>[s, ...prev])
    setActiveId(s.id)
  }

  async function send(){
    const text = input.trim()
    if (!text || !activeSession) return

    setInput('')

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text
    }

    setSessions(prev =>
      prev.map(s =>
        s.id===activeSession.id
          ? { ...s, messages: [...s.messages, userMsg] }
          : s
      )
    )

    try {
      const payload = { messages: [...activeSession.messages, userMsg] }
      const ai = await AIAPI.chat(payload)

      const botMsg = {
        id: Date.now()+1,
        role: 'assistant',
        content: ai.reply || "I'm here to help."
      }

      setSessions(prev =>
        prev.map(s =>
          s.id===activeSession.id
            ? { ...s, messages: [...s.messages, botMsg] }
            : s
        )
      )

    } catch {
      const botMsg = {
        id: Date.now()+1,
        role: 'assistant',
        content: "AI error. Try again."
      }

      setSessions(prev =>
        prev.map(s =>
          s.id===activeSession.id
            ? { ...s, messages: [...s.messages, botMsg] }
            : s
        )
      )
    }
  }

  return (
    <div style={{ position:'relative' }}>
      <button className="btn ghost" onClick={()=>setOpen(true)}>💬</button>

      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:1000 }}>

          {/* overlay */}
          <div
            onClick={()=>setOpen(false)}
            style={{
              position:'absolute',
              inset:0,
              background:'rgba(0,0,0,0.2)'
            }}
          />

          {/* panel */}
          <div style={{
            position:'relative',
            width:'100vw',
            height:'100vh',
            display:'grid',
            gridTemplateRows:'auto 1fr',
            background:'var(--panel)',
            color:'var(--text)'
          }}>

            {/* header */}
            <div style={{
              display:'flex',
              justifyContent:'space-between',
              padding:'12px',
              borderBottom:'1px solid var(--border)'
            }}>
              <strong>Sahaay Chat</strong>
              <button className="btn ghost" onClick={()=>setOpen(false)}>×</button>
            </div>

            {/* layout */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'260px 1fr'
            }}>

              {/* sessions */}
              <div style={{
                borderRight:'1px solid var(--border)',
                padding:'10px'
              }}>
                <button className="btn primary" onClick={newSession}>
                  New session
                </button>

                {sessions.map(s => (
                  <div
                    key={s.id}
                    onClick={()=>setActiveId(s.id)}
                    style={{
                      padding:'10px',
                      marginTop:'6px',
                      cursor:'pointer',
                      borderRadius:'8px',
                      background: s.id===activeId
                        ? 'var(--panel-2)'
                        : 'transparent'
                    }}
                  >
                    {s.title}
                  </div>
                ))}
              </div>

              {/* chat */}
              <div style={{
                display:'flex',
                flexDirection:'column'
              }}>

                {/* messages */}
                <div ref={listRef} style={{
                  flex:1,
                  padding:'12px',
                  overflow:'auto'
                }}>
                  {activeSession && activeSession.messages.map(m => (
                    <div key={m.id} style={{ marginBottom:'10px' }}>
                      <div style={{
                        background: m.role==='user'
                          ? 'var(--primary)'
                          : 'var(--panel-2)',
                        color: m.role==='user'
                          ? '#fff'
                          : 'var(--text)',
                        border:'1px solid var(--border)',
                        padding:'10px',
                        borderRadius:'10px',
                        maxWidth:'80%'
                      }}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* input */}
                <div style={{
                  display:'flex',
                  gap:'8px',
                  padding:'10px',
                  borderTop:'1px solid var(--border)'
                }}>
                  <input
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    onKeyDown={e=> e.key==='Enter' && send()}
                    style={{ flex:1 }}
                  />
                  <button className="btn primary" onClick={send}>
                    Send
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}