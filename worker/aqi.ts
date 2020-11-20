import { Model } from 'mongoose'
import { ClimatePoint, GasPoint, ParticulatePoint } from './db'
import { AQICalculator, GetPointDoc, PointType } from './types'

const getTimeAverage = async (averageHours: number, type: PointType, key: keyof GetPointDoc<typeof type>): Promise<number> => {
  const start = new Date()
  start.setHours(start.getHours() - averageHours)

  const Document = (type === PointType.Climate
    ? ClimatePoint
    : type === PointType.Gases
    ? GasPoint
    : ParticulatePoint) as Model<GetPointDoc<typeof type>>

  const points = await Document.find({
    when: { $gt: start }
  }).select(key)

  return points.reduce((p, c) => p + c[key], 0) / points.length
}

const calculateAqiFromCalculator = async (calculator: AQICalculator): Promise<number> => {
  const averageCache: { [averageHours: number]: number } = {}

  for (const level of calculator.levels) {
    const average
      = averageCache[level.averageHours]
      = averageCache[level.averageHours] ?? await getTimeAverage(
        level.averageHours,
        calculator.type,
        calculator.key as keyof GetPointDoc<typeof calculator.type>
      )
    
    if (average >= level.concentrationLow && average <= level.concentrationHigh) {
      return (
        (level.aqiHigh - level.aqiLow) / (level.concentrationHigh - level.concentrationLow)
      ) + (average - level.concentrationLow)
        + level.aqiHigh
    }
  }

  return 0
}

const calculators: AQICalculator[] = [
  {
    type: PointType.Particulates,
    key: 'pm25',
    levels: [
      {
        averageHours: 24,
        concentrationLow: 0,
        concentrationHigh: 12,
        aqiLow: 0,
        aqiHigh: 50
      },
      {
        averageHours: 24,
        concentrationLow: 12.1,
        concentrationHigh: 35.4,
        aqiLow: 51,
        aqiHigh: 100
      },
      {
        averageHours: 24,
        concentrationLow: 35.5,
        concentrationHigh: 55.4,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 24,
        concentrationLow: 55.5,
        concentrationHigh: 150.4,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 24,
        concentrationLow: 150.5,
        concentrationHigh: 250.4,
        aqiLow: 201,
        aqiHigh: 300
      },
      {
        averageHours: 24,
        concentrationLow: 250.5,
        concentrationHigh: 350.4,
        aqiLow: 301,
        aqiHigh: 400
      },
      {
        averageHours: 24,
        concentrationLow: 350.5,
        concentrationHigh: 500.4,
        aqiLow: 401,
        aqiHigh: 500
      }
    ]
  },
  {
    type: PointType.Particulates,
    key: 'pm10',
    levels: [
      {
        averageHours: 24,
        concentrationLow: 0,
        concentrationHigh: 54,
        aqiLow: 0,
        aqiHigh: 50
      },
      {
        averageHours: 24,
        concentrationLow: 55,
        concentrationHigh: 154,
        aqiLow: 51,
        aqiHigh: 100
      },
      {
        averageHours: 24,
        concentrationLow: 155,
        concentrationHigh: 254,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 24,
        concentrationLow: 255,
        concentrationHigh: 354,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 24,
        concentrationLow: 355,
        concentrationHigh: 424,
        aqiLow: 201,
        aqiHigh: 300
      },
      {
        averageHours: 24,
        concentrationLow: 425,
        concentrationHigh: 504,
        aqiLow: 301,
        aqiHigh: 400
      },
      {
        averageHours: 24,
        concentrationLow: 505,
        concentrationHigh: 604,
        aqiLow: 401,
        aqiHigh: 500
      }
    ]
  },

  {
    type: PointType.Gases,
    key: 'o3',
    levels: [
      {
        averageHours: 8,
        concentrationLow: 0,
        concentrationHigh: 54,
        aqiLow: 0,
        aqiHigh: 50
      },
      {
        averageHours: 8,
        concentrationLow: 55,
        concentrationHigh: 70,
        aqiLow: 51,
        aqiHigh: 100
      },
      {
        averageHours: 8,
        concentrationLow: 71,
        concentrationHigh: 85,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 8,
        concentrationLow: 86,
        concentrationHigh: 105,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 8,
        concentrationLow: 106,
        concentrationHigh: 200,
        aqiLow: 201,
        aqiHigh: 300
      }
    ]
  },
  {
    type: PointType.Gases,
    key: 'o3',
    levels: [
      {
        averageHours: 1,
        concentrationLow: 125,
        concentrationHigh: 164,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 1,
        concentrationLow: 165,
        concentrationHigh: 204,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 1,
        concentrationLow: 205,
        concentrationHigh: 404,
        aqiLow: 201,
        aqiHigh: 300
      },
      {
        averageHours: 1,
        concentrationLow: 405,
        concentrationHigh: 504,
        aqiLow: 301,
        aqiHigh: 400
      },
      {
        averageHours: 1,
        concentrationLow: 505,
        concentrationHigh: 604,
        aqiLow: 401,
        aqiHigh: 500
      }
    ]
  },

  {
    type: PointType.Gases,
    key: 'c0',
    levels: [
      {
        averageHours: 8,
        concentrationLow: 0,
        concentrationHigh: 4.4,
        aqiLow: 0,
        aqiHigh: 50
      },
      {
        averageHours: 8,
        concentrationLow: 4.5,
        concentrationHigh: 9.4,
        aqiLow: 51,
        aqiHigh: 100
      },
      {
        averageHours: 8,
        concentrationLow: 9.5,
        concentrationHigh: 12.4,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 8,
        concentrationLow: 12.5,
        concentrationHigh: 15.4,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 8,
        concentrationLow: 15.5,
        concentrationHigh: 30.4,
        aqiLow: 201,
        aqiHigh: 300
      },
      {
        averageHours: 8,
        concentrationLow: 30.5,
        concentrationHigh: 40.4,
        aqiLow: 301,
        aqiHigh: 400
      },
      {
        averageHours: 8,
        concentrationLow: 40.5,
        concentrationHigh: 50.4,
        aqiLow: 401,
        aqiHigh: 500
      }
    ]
  },
  {
    type: PointType.Gases,
    key: 'so2',
    levels: [
      {
        averageHours: 1,
        concentrationLow: 0,
        concentrationHigh: 35,
        aqiLow: 0,
        aqiHigh: 50
      },
      {
        averageHours: 1,
        concentrationLow: 36,
        concentrationHigh: 75,
        aqiLow: 51,
        aqiHigh: 100
      },
      {
        averageHours: 1,
        concentrationLow: 76,
        concentrationHigh: 185,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 1,
        concentrationLow: 186,
        concentrationHigh: 304,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 24,
        concentrationLow: 305,
        concentrationHigh: 604,
        aqiLow: 201,
        aqiHigh: 300
      },
      {
        averageHours: 24,
        concentrationLow: 605,
        concentrationHigh: 804,
        aqiLow: 301,
        aqiHigh: 400
      },
      {
        averageHours: 24,
        concentrationLow: 805,
        concentrationHigh: 1004,
        aqiLow: 401,
        aqiHigh: 500
      }
    ]
  },
  {
    type: PointType.Gases,
    key: 'no2',
    levels: [
      {
        averageHours: 1,
        concentrationLow: 0,
        concentrationHigh: 53,
        aqiLow: 0,
        aqiHigh: 50
      },
      {
        averageHours: 1,
        concentrationLow: 54,
        concentrationHigh: 100,
        aqiLow: 51,
        aqiHigh: 100
      },
      {
        averageHours: 1,
        concentrationLow: 101,
        concentrationHigh: 360,
        aqiLow: 101,
        aqiHigh: 150
      },
      {
        averageHours: 1,
        concentrationLow: 361,
        concentrationHigh: 649,
        aqiLow: 151,
        aqiHigh: 200
      },
      {
        averageHours: 1,
        concentrationLow: 650,
        concentrationHigh: 1249,
        aqiLow: 201,
        aqiHigh: 300
      },
      {
        averageHours: 1,
        concentrationLow: 1250,
        concentrationHigh: 1649,
        aqiLow: 301,
        aqiHigh: 400
      },
      {
        averageHours: 1,
        concentrationLow: 1650,
        concentrationHigh: 2049,
        aqiLow: 401,
        aqiHigh: 500
      }
    ]
  }
]

export const calculateAqi = async (): Promise<number> => {
  const values = []

  for (const calculator of calculators) {
    const aqi = await calculateAqiFromCalculator(calculator)
    console.log(calculator.key, aqi)
    values.push(aqi)
  }

  return Math.round(Math.max(...values))
}