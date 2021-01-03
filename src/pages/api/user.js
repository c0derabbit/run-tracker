import { getSession } from '../../lib/iron'

export default async (req, res) => {
  try {
    const user = await getSession(req)

    res.json(user)
  } catch (error) {
    res.status(401).end()
  }
}
