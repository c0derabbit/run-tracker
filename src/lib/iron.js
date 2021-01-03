import Iron from '@hapi/iron'
import CookieService from './cookie'

export async function encryptSession(session) {
  return await Iron.seal(session, process.env.TOKEN_SECRET, Iron.defaults)
}

export async function getSession(req) {
  const token = CookieService.getTokenCookie(req)
  return token && Iron.unseal(token, process.env.TOKEN_SECRET, Iron.defaults)
}
