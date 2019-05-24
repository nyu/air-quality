import formatData from './formatData'
import fetch from 'isomorphic-unfetch'

const base = process.env.NODE_ENV === 'production' ? 'http://localhost:3000/api/' : 'http://localhost:3000/api/'

export default async () => {
  const res = await fetch(`${base}initial`)
  const data = await res.json()
  if (!data) return []
  return [ formatData(data) ]
}