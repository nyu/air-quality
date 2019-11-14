import fetch from 'isomorphic-unfetch'

const base = process.env.NODE_ENV === 'production'
  ? 'http://airquality.engineering.nyu.edu'
  : 'http://localhost:3000'

export default async () => {
  const res = await fetch(`${base}/api/aqi`)
  const json = await res.json()
  return json.aqi
}
