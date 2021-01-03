import CookieService from '../../lib/cookie'
import { magic } from '../../lib/magic'
import { encryptSession } from '../../lib/iron'

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const did = req.headers.authorization.split('Bearer').pop().trim()
  const user = await magic.users.getMetadataByToken(did)

  const token = await encryptSession(user)
  CookieService.setTokenCookie(res, token)

  res.end()
}
