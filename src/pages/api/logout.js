import CookieService from '../../lib/cookie'
import { getSession } from '../../lib/iron'
import { magic } from '../../lib/magic'

export default async function logout(req, res) {
  const session = await getSession(req)
  await magic.users.logoutByIssuer(session.issuer)

  CookieService.removeTokenCookie(res)

  res.writeHead(302, { Location: '/' })
  res.end()
}
