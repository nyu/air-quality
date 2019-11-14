import fetch from 'isomorphic-unfetch'

const host = process.env.NODE_ENV === 'production'
  ? 'worker'
  : 'localhost'

export default async (_, res) => {
  const fetchRes = await fetch(`http://${host}:3001/aqi`)
  const json = await fetchRes.json()
  res.json({ aqi: json.value })
}