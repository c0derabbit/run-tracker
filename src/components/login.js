import { useEffect, useState } from 'react'
import { Magic } from 'magic-sdk'
import { Alert, Button, Heading, Pane, Paragraph, TextInputField, defaultTheme } from 'evergreen-ui'

import { gap } from '../styles/settings'
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
        .loginWithMagicLink({ email })

      const authRequest = await fetch('/api/login', {
        method: 'POST',
        headers: { Authorization: `Bearer ${did}` },
      })

      if (authRequest.ok) {
        setLoggedIn(true)
      } else {
        throw new Error('We couldn’t sign you in — please try again later or get in touch.')
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 100px)"
      textAlign="center"
      paddingY={gap * 3}
    >
      <Pane>
        <Heading
          is="h1"
          size={100}
          fontSize={40}
          marginBottom={gap * 2}
          color={defaultTheme.palette.red.dark}
        >
          <strong>run</strong>tracker
        </Heading>
        <Paragraph>
          Welcome, please enter your email to sign in (or up).
        </Paragraph>
        <Pane
          is="form"
          onSubmit={logIn}
          elevation={1}
          width={400}
          maxWidth={`calc(100vw - ${gap * 2})`}
          marginX="auto"
          marginY={gap * 2}
          padding={gap}
          textAlign="left"
        >
          <TextInputField
            label="Email"
            name="email"
            type="email"
            inputHeight={40}
            marginBottom={gap * .6}
            required
          />
          <Button
            type="submit"
            appearance="primary"
            width="100%"
            height={40}
            justifyContent="center"
            disabled={loading}
          >
            Sign in
          </Button>
        </Pane>
        {error && (
          <Alert intent="danger" title="Something went wrong" textAlign="left">
            {error?.message}
          </Alert>
        )}
      </Pane>
    </Pane>
  )
}
