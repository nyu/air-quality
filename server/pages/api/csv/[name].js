import fetch from 'isomorphic-unfetch'

const host = process.env.NODE_ENV === 'production'
  ? 'worker'
  : 'localhost'

export default async (req, res) => {
  const fetchRes = await fetch(`http://${host}:3001/data/${encodeURIComponent(req.query.name)}.csv`)
  const text = await fetchRes.text()
  res.send(text)
}