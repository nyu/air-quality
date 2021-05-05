import mongoose, { Schema } from 'mongoose'
import { ParticulatePointDoc, GasPointDoc, ClimatePointDoc, AQIMeasurementDoc, Point, ParticulatesPointValue, ClimatePointValue, GasesPointValue } from './types'

const host = process.env.NODE_ENV === 'production' ? 'db' : 'localhost'
mongoose.connect(`mongodb://${host}:27017/airquality`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

export const ParticulatePoint = mongoose.model<ParticulatePointDoc>('ParticulatePoint', new Schema({
  pm25: Number,
  pm1: Number,
  pm10: Number,
  when: {
    type: Date,
    unique: true
  }
}))

export const GasPoint = mongoose.model<GasPointDoc>('GasPoint', new Schema({
  c0: Number,
  no2: Number,
  o3: Number,
  so2: Number,
  when: {
    type: Date,
    unique: true
  }
}))

export const ClimatePoint = mongoose.model<ClimatePointDoc>('ClimatePoint', new Schema({
  temperature: Number,
  humidity: Number,
  when: {
    type: Date,
    unique: true
  }
}))

export const addPoints = async ({ particulates, climate, gases }: { particulates: Point<ParticulatesPointValue>[], climate: Point<ClimatePointValue>[], gases: Point<GasesPointValue>[] }) => {
  const promises: Promise<unknown>[] = []

  for (let i = 0; i < particulates.length; i++) {
    const point = new ParticulatePoint({
      pm25: particulates[i].val.pm2p5,
      pm1: particulates[i].val.pm1,
      pm10: particulates[i].val.pm10,
      when: Date.parse(particulates[i].rec)
    })
    promises.push(point.save().catch(() => null))
  }

  for (let i = 0; i < climate.length; i++) {
    const point = new ClimatePoint({
      temperature: climate[i].val.tmp,
      humidity: climate[i].val.hmd,
      when: Date.parse(climate[i].rec)
    })
    promises.push(point.save().catch(() => null))
  }

  for (let i = 0; i < gases.length; i++) {
    const point = new GasPoint({
      co: gases[i].val.CO.cnc,
      no2: gases[i].val.NO2.cnc,
      o3: gases[i].val.Ox.cnc,
      so2: gases[i].val.SO2.cnc,
      when: Date.parse(gases[i].rec)
    })
    promises.push(point.save().catch(() => null))
  }

  await Promise.all(promises)
}

const AQIMeasurement = mongoose.model<AQIMeasurementDoc>('AQIMeasurement', new Schema({
  value: Number,
  when: {
    type: Date,
    unique: true
  }
}))

export const addAqiMeasurement = async (value: number) => {
  const point = new AQIMeasurement({
    value,
    when: new Date()
  })
  await point.save()
}

export const getLatestAqi = async () => {
  const point = await AQIMeasurement.findOne().sort({ when: -1 })
  return point
}