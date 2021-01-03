import { serialize } from 'cookie'

const TOKEN_NAME = 'api_token'
const MAX_AGE = 60 * 60 * 24 // 24 hours

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  })
}

function setTokenCookie(res, token) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, token),
  ])
}

function getTokenCookie(req) {
  return req.cookies[TOKEN_NAME]
}

function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', { maxAge: -1, path: '/' })
  res.setHeader('Set-Cookie', cookie)
}

export default { getTokenCookie, setTokenCookie, removeTokenCookie }
