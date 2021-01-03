import { Button, Heading, Pane, defaultTheme } from 'evergreen-ui'

import { gap, pageSize } from '../styles/settings'
import { useAuthContext } from '../context/auth-context'

export default function Header() {
  const { loggedIn } = useAuthContext()

  return (
    <Pane
      is="header"
      paddingX={gap}
      paddingY={gap / 2}
      borderBottom="default"
    >
      <Pane
        maxWidth={pageSize}
        height={30}
        justifyContent="space-between"
        alignItems="center"
        display="flex"
        marginX="auto"
      >
        <Heading
          href="/"
          color={defaultTheme.palette.neutral.dark}
          size={100}
          fontSize={16}
          textDecoration="none"
        >
          <strong>run</strong>tracker
        </Heading>
        {loggedIn && (
          <Button is="a" href="/api/logout">
            Log out
          </Button>
        )}
      </Pane>
    </Pane>
  )
}
