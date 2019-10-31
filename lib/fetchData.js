import fetch from 'isomorphic-unfetch'

export default async () => {
  const end = new Date() // End date is current date
  const start = new Date(end) // Copy end date to start date
  start.setHours(start.getHours() - 1) // Turn start date back an hour

  const res = await fetch(`https://aws.southcoastscience.com/topicMessages?topic=${
    encodeURIComponent('nyu/brooklyn/loc/1/particulates')
    }&startTime=${
    encodeURIComponent(start.toISOString())
    }&endTime=${
    encodeURIComponent(end.toISOString())
    }`)
  const json = await res.json()
  return json.Items
}