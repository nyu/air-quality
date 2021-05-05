import fetch from 'node-fetch'
import { GetPointValue, Point, PointType } from './types'

export const getPoints = async () => {
  const end = new Date()
  const start = new Date(end)
  start.setHours(start.getHours() - 2)

  const data: { [key in PointType]: Point<GetPointValue<key>>[] } = {
    particulates: [],
    gases: [],
    climate: []
  }

  await Promise.all(Object.values(PointType).map((type) => (async () => {
    const res = await fetch(`https://aws.southcoastscience.com/topicMessages?topic=${
      encodeURIComponent(`nyu/shanghai/loc/1/${type}`)
      }&startTime=${
      encodeURIComponent(start.toISOString())
      }&endTime=${
      encodeURIComponent(end.toISOString())
      }`, {
        headers: {
          'authorization': `api-key ${process.env.SCS_KEY}`
        }
      })
    const json = await res.json()

    data[type] = json.Items
  })()))

  return data
}
