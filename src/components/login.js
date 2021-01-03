import { useEffect, useState } from 'react'
import { Magic } from 'magic-sdk'
import { useAuthContext } from '../context/auth-context'

export default function Login() {
  const [error, setError] = useState(null)
  const { loading, setLoading, setLoggedIn } = useAuthContext()

  useEffect(() => {
    setLoading(false)
  }, [error])

  async function logIn(e) {
    e.preventDefault()
    const { elements } = e.target
    const email = elements.email.value

    try {
      setLoading(true)
      const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
        .auth
        .loginWithMagicLink({ email: elements.email.value })

      const authRequest = await fetch('/api/login', {
        method: 'POST',
        headers: { Authorization: `Bearer ${did}` },
      })

      if (authRequest.ok) {
        setLoggedIn(true)
      } else {
        throw new Error('Something went wrong — please try again later.')
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      <h1>
        Kérlek, jelentkezz be.<br />
        <small>
          Welcome, please log in.
        </small>
      </h1>
      <form onSubmit={logIn}>
        <label>
          <span>
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            onFocus={() => { setError(null) }}
            onChange={() => { setError(null) }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}

        >
          Bejelentkezés
        </button>
        {error && (
          <p>
            {error?.message}
          </p>
        )}
      </form>
    </div>
  )
}
