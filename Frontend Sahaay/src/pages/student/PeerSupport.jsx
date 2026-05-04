import { useState } from 'react'

export function PeerSupport() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'Peer', text: 'Welcome! Share how you feel today.' }
  ])
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return

    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, from: 'You', text: input }
    ])

    setInput('')
  }

  return (
    <div className="card">
      <h2>Peer Support</h2>

      {/* Chat box */}
      <div style={{
        height: 300,
        overflow: 'auto',
        padding: 12,
        background: 'var(--panel-2)',
        borderRadius: 10,
        border: '1px solid var(--border)'
      }}>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <strong style={{ color: 'var(--primary)' }}>
              {m.from}:
            </strong>{' '}
            <span style={{ color: 'var(--text)' }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: 'var(--input-bg)',
            color: 'var(--text)'
          }}
        />

        <button className="btn primary" onClick={send}>
          Send
        </button>
      </div>

      {/* Info */}
      <p className="pill" style={{ marginTop: 8 }}>
        Anonymous mode enabled
      </p>
    </div>
  )
}