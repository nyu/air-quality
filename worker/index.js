const { getPoints } = require('./fetch')
const { averagePoints, getAqiFromAverage } = require('./getPm25Aqi')
const { addPoints, addAqiMeasurement, getPm2524h, getLatestAqi, getAqi } = require('./db')

const savePoints = () => {
  return getPoints()
    .then((points) => addPoints(points))
    .then(() => console.log('> Points saved'))
    .catch(console.error)
}

const saveAqi = () => {
  return getPm2524h()
    .then((points) => {
      const c = averagePoints(points)
      const aqi = getAqiFromAverage(c)
      return addAqiMeasurement(aqi, c)
    })
    .then(() => console.log('> AQI saved'))
    .catch(console.error)
}

setInterval(saveAqi, 1000 * 60 * 5)
setInterval(savePoints, 1000 * 60 * 60)

savePoints().then(() => saveAqi())

app = require('express')()


app.get('/aqi', async (_, res) => {
  const latestAqi = await getLatestAqi()
  res.json(latestAqi)
})

app.get('/allaqi', async (req, res) => {
  const allAqi = await getAqi()
  res.send(allAqi)
})

app.listen(3001, () => console.log('> Server ready'))
