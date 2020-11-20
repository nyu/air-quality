import { Document } from 'mongoose'

export interface ParticulatePointDoc extends Document {
  pm25: number,
  pm1: number,
  pm10: number,
  when: Date
}

export interface GasPointDoc extends Document {
  c0: number,
  no2: number,
  o3: number,
  so2: number,
  when: Date
}

export interface ClimatePointDoc extends Document {
  temperature: number,
  humidity: number,
  when: Date
}

export interface AQIMeasurementDoc extends Document {
  value: number,
  when: Date
}

export enum PointType {
  Particulates = 'particulates',
  Climate = 'climate',
  Gases = 'gases'
}

export interface Point<ValueType extends PointValue> {
  expire_at: number,
  upload: string,
  payload: {
    val: ValueType,
    rec: string,
    tag: string
  },
  topic: string,
  device: string,
  rec_at: string
}

export interface ParticulatesPointValue {
  mtf1: number,
  mtf5: number,
  pm1: number,
  pm2p5: number,
  bin: number[],
  mtf3: number,
  pm10: number,
  mtf7: number,
  per: number
}

export interface ClimatePointValue {
  hmd: number,
  tmp: number,
  bar: number
}

export interface GasesPointValue {
  NO2: {
    weV: number,
    cnc: number,
    aeV: number,
    weC: number
  },
  Ox: {
    weV: number,
    cnc: number,
    aeV: number,
    weC: number
  },
  CO: {
    weV: number,
    cnc: number,
    aeV: number,
    weC: number
  },
  sht: {
    hmd: number,
    tmp: number
  },
  SO2: {
    weV: number,
    cnc: number,
    aeV: number,
    weC: number
  }
}

export type PointValue = ParticulatesPointValue | ClimatePointValue | GasesPointValue

export type GetPointValue<T extends PointType> = T extends PointType.Climate
  ? ClimatePointValue
  : T extends PointType.Gases
  ? GasesPointValue
  : ParticulatesPointValue

export type GetPointDoc<T extends PointType> = T extends PointType.Climate
  ? ClimatePointDoc
  : T extends PointType.Gases
  ? GasPointDoc
  : ParticulatePointDoc

export interface AQICalculator {
  type: PointType,
  key: string,
  levels: {
    averageHours: number,
    concentrationLow: number,
    concentrationHigh: number,
    aqiLow: number,
    aqiHigh: number
  }[]
}