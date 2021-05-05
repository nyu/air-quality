import fetch from 'isomorphic-unfetch'

const prefix = process.env.NODE_ENV === 'production'
  ? 'http://airquality.engineering.nyu.edu'
  : 'http://localhost:3000'

export default async () => {
  const res = await fetch(`${prefix}/api/data`)
  return await res.json()
}
