const mongoose = require('mongoose')

const host = process.env.NODE_ENV === 'production' ? 'db' : 'localhost'
mongoose.connect(`mongodb://${host}:27017/airquality`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const ParticulatePoint = mongoose.model('ParticulatePoint', {
  pm25: Number,
  pm1: Number,
  pm10: Number,
  when: {
    type: Date,
    unique: true
  }
})

const GasPoint = mongoose.model('GasPoint', {
  c0: Number,
  no2: Number,
  o3: Number,
  so2: Number,
  when: {
    type: Date,
    unique: true
  }
})

const ClimatePoint = mongoose.model('ClimatePoint', {
  temperature: Number,
  humidity: Number,
  when: {
    type: Date,
    unique: true
  }
})

module.exports.addPoints = async ({ particulates, climate, gases }) => {
  const promises = []

  for (let i = 0; i < particulates.length; i++) {
    const point = new ParticulatePoint({
      pm25: particulates[i].payload.val.pm2p5,
      pm1: particulates[i].payload.val.pm1,
      pm10: particulates[i].payload.val.pm10,
      when: Date.parse(particulates[i].payload.rec)
    })
    promises.push(point.save().catch(() => null))
  }

  for (let i = 0; i < climate.length; i++) {
    const point = new ClimatePoint({
      temperature: climate[i].payload.val.tmp,
      humidity: climate[i].payload.val.hmd,
      when: Date.parse(climate[i].payload.rec)
    })
    promises.push(point.save().catch(() => null))
  }

  for (let i = 0; i < gases.length; i++) {
    const point = new GasPoint({
      co: gases[i].payload.val.CO.cnc,
      no2: gases[i].payload.val.NO2.cnc,
      o3: gases[i].payload.val.Ox.cnc,
      so2: gases[i].payload.val.SO2.cnc,
      when: Date.parse(gases[i].payload.rec)
    })
    promises.push(point.save().catch(() => null))
  }

  await Promise.all(promises)
}

module.exports.getPm2524h = async () => {
  const start = new Date()
  start.setDate(start.getDate() - 1)

  return await ParticulatePoint.find({
    when: { $gt: start }
  }).select('pm25')
}

const AQIMeasurement = mongoose.model('AQIMeasurement', {
  value: Number,
  averagePm25: Number,
  when: {
    type: Date,
    unique: true
  }
})

module.exports.addAqiMeasurement = async (value, averagePm25) => {
  const point = new AQIMeasurement({
    value, averagePm25,
    when: new Date()
  })
  await point.save()
}

module.exports.getLatestAqi = async () => {
  const point = await AQIMeasurement.findOne().sort({ when: -1 })
  return point
}

module.exports.getAqi = async() => {
  const points = await AQIMeasurement.find({}).select('when value -_id')
  return points
}