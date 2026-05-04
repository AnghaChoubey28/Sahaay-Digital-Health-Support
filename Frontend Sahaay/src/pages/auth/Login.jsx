import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const initialRole = params.get('role') === 'admin' ? 'admin' : 'student'
  const [role, setRole] = useState(initialRole)

  function submit(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const identity = form.get('identity')
    const password = form.get('password')

    login(role==='admin'
      ? { username: identity, password }
      : { email: identity, password }
    )
      .then(()=> navigate(role==='admin'
        ? '/admin/dashboard'
        : '/student/dashboard'
      ))
      .catch(()=> alert('Login failed'))
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'var(--bg)'
    }}>

      <div style={{
        background: 'var(--panel)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '420px',
        width: '100%'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '28px',
            color: 'var(--primary)',
            marginBottom: '8px'
          }}>
            Sahaay
          </h1>

          <p style={{
            color: 'var(--muted)',
            fontSize: '14px'
          }}>
            Your mental health companion
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit}>

          {/* Role toggle */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <button
              type="button"
              onClick={()=>setRole('student')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: role==='student'
                  ? 'var(--primary)'
                  : 'transparent',
                color: role==='student'
                  ? '#fff'
                  : 'var(--text)'
              }}
            >
              Student
            </button>

            <button
              type="button"
              onClick={()=>setRole('admin')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: role==='admin'
                  ? 'var(--primary)'
                  : 'transparent',
                color: role==='admin'
                  ? '#fff'
                  : 'var(--text)'
              }}
            >
              Admin
            </button>
          </div>

          {/* Email / Username */}
          <input
            name="identity"
            required
            placeholder={role==='admin'
              ? 'Username'
              : 'Email address'}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--input-bg)',
              color: 'var(--text)'
            }}
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--input-bg)',
              color: 'var(--text)'
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: '600'
            }}
          >
            Sign In
          </button>
        </form>

        {/* Signup */}
        {role === 'student' && (
          <div style={{
            marginTop: '16px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--muted)' }}>
              Don't have an account?
            </p>

            <a href="/signup" style={{
              color: 'var(--primary)'
            }}>
              Create account
            </a>
          </div>
        )}
      </div>
    </div>
  )
}