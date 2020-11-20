import { getPoints } from './fetch'
import { Parser } from 'json2csv'
import express from 'express'
import { addPoints, addAqiMeasurement, getLatestAqi, ParticulatePoint, GasPoint, ClimatePoint } from './db'
import { calculateAqi } from './aqi'

const savePoints = () => {
  return getPoints()
    .then((points) => addPoints(points))
    .then(() => console.log('> Points saved'))
    .catch(console.error)
}

const saveAqi = async () => {
  try {
    const aqi = await calculateAqi()
    await addAqiMeasurement(aqi)
    console.log('> AQI saved')
  } catch (error) {
    console.error(error)
  }
}

setInterval(saveAqi, 1000 * 60 * 5)
setInterval(savePoints, 1000 * 60 * 60)

savePoints().then(() => saveAqi())

const app = express()

app.get('/aqi', async (_, res) => {
  const latestAqi = await getLatestAqi()
  res.json(latestAqi)
})

app.get('/data/particulates.csv', async (_, res) => {
  const start = new Date()
  start.setDate(start.getMonth() - 2)

  const data = await ParticulatePoint.find({
    when: { $gt: start }
  })
  const parser = new Parser({ fields: [ 'pm25', 'pm1', 'pm10', 'when' ] })
  res.send(parser.parse(data))
})

app.get('/data/gases.csv', async (_, res) => {
  const start = new Date()
  start.setDate(start.getMonth() - 2)

  const data = await GasPoint.find({
    when: { $gt: start }
  })
  const parser = new Parser({ fields: [ 'c0', 'no2', 'o3', 'so2', 'when' ] })
  res.send(parser.parse(data))
})

app.get('/data/climate.csv', async (_, res) => {
  const start = new Date()
  start.setDate(start.getMonth() - 2)

  const data = await ClimatePoint.find({
    when: { $gt: start }
  })
  const parser = new Parser({ fields: [ 'temperature', 'humidity', 'when' ] })
  res.send(parser.parse(data))
})

app.listen(3001, () => console.log('> Server ready'))
