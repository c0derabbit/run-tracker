import Head from 'next/head'

import Login from '../components/login'
import { useAuthContext } from '../context/auth-context'

export default function Home() {
  const { loading, loggedIn } = useAuthContext()

  const Page = () => (
    <div>
      <header>
        <a href="/api/logout">
          Log out
          <img src="/assets/logout.svg" alt="" />
        </a>
      </header>
    </div>
  )

  const Loader = () => (
    <p>
      <img src="/assets/loader.svg" alt="" /><br />
      Loading…
    </p>
  )

  return (
    <>
      <Head>
        <title>Run Tracker</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        {loading
          ? <Loader />
          : (loggedIn ? <Page /> : <Login />)
        }
      </main>
    </>
  )
}
