const { getPoints } = require('./fetch')
const { averagePoints, getAqiFromAverage } = require('./getPm25Aqi')
const { addPoints, addAqiMeasurement, getPm2524h, getLatestAqi } = require('./db')

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

require('express')()
  .get('/aqi', async (_, res) => {
    const latestAqi = await getLatestAqi()
    res.json(latestAqi)
  })
  .listen(3001, () => console.log('> Server ready'))
