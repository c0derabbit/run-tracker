import Head from 'next/head'
import { Pane, Spinner } from 'evergreen-ui'

import { gap, pageSize } from '../styles/settings'
import { Header, Login, RunLog } from '../components'
import { useAuthContext } from '../context/auth-context'

export default function Home() {
  const { loading, loggedIn } = useAuthContext()

  const Page = () => (
    <RunLog />
  )

  const Loader = () => (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 80px)"
    >
      <Spinner />
    </Pane>
  )

  return (
    <>
      <Head>
        <title>Run tracker</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Pane
        is="main"
        background={loggedIn ? 'tint1' : null}
        minHeight="calc(100vh - 52px)"
      >
        <Pane
          maxWidth={pageSize + gap * 2}
          marginX="auto"
          padding={gap}
        >
          {loading
            ? <Loader />
            : (loggedIn ? <Page /> : <Login />)
          }
        </Pane>
      </Pane>
    </>
  )
}
