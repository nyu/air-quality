import fetch from 'isomorphic-unfetch'

const types = [
  'particulates',
  'climate',
  'gases'
]

export default async () => {
  const end = new Date() // End date is current date
  const start = new Date(end) // Copy end date to start date
  start.setHours(start.getHours() - 2) // Turn start date back two hours

  const data = {}

  await Promise.all(types.map((type) => (async () => {
    const res = await fetch(`https://aws.southcoastscience.com/topicMessages?topic=${
      encodeURIComponent(`nyu/brooklyn/loc/1/${type}`)
      }&startTime=${
      encodeURIComponent(start.toISOString())
      }&endTime=${
      encodeURIComponent(end.toISOString())
      }`)
    const json = await res.json()
    data[type] = json.Items
  })()))

  return data
}