const fetch = require('node-fetch')

const types = [
  'particulates',
  'climate',
  'gases'
]

module.exports.getPoints = async () => {
  const end = new Date()
  const start = new Date(end)
  start.setHours(start.getHours() - 2)

  const data = {}

  await Promise.all(types.map((type) => (async () => {
    const res = await fetch(`https://aws.southcoastscience.com/topicMessages?topic=${
      encodeURIComponent(`nyu/shanghai/loc/1/${type}`)
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