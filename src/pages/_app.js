import { AuthProvider } from '../context/auth-context'
import '../styles/index.css'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
