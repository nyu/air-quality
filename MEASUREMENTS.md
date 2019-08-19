# Measurements

These are all the things that will be measured and their units.

- Name: string
- Location
  - Latitude: number
  - Longitude: number
- Time: unix timestamp
- Temperature: number (celsius)
- Humidity:
  - Relative: number (%)
  - Absolute: number (kg per cubic m)
- Particulate matter
  - Diameter < 2.5 μm: number (concentration in parts per million)
  - Diameter < 10 μm: number (concentration in parts per million)
- Gasses:
  - CO2 (carbon dioxide): number (parts per million)
  - CO (carbon monoxide): number (parts per million)
  - O2 (oxygen): number (parts per million)
  - O3 (ozone): number (parts per million)
  - CH4 (methane): number (parts per million)
  - SO2 (sulfur dioxide): number (parts per million)
  - H2S (hydrogen sulfide): number (parts per million)
  - NO (nitrogen monoxide): number (parts per million)
  - NO2 (nitrogen dioxide): number (parts per million)

This results in the below schema for sending and storing data.

```javascript
{
  when: Number,
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  temperature: Number,
  humidity: {
    relative: Number,
    absolute: Number
  },
  particulateMatter: {
    pm25: Number,
    pm10: Number
  },
  gasses: {
    co: Number,
    co2: Number,
    o2: Number,
    o3: Number,
    ch4: Number,
    so2: Number,
    h2s: Number,
    no: Number,
    no2: Number
  }
}
```