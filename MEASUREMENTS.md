# Measurements

These are all the things that will be measured and their units.

- Name: string
- Location:
  - Latitude: number
  - Longitude: number
- Time: unix timestamp
- Temperature: number (°C)
- Relative humidity: number (%)
- Particulate matter:
  - Diameter < 1 μm: number (concentration in µg/m³)
  - Diameter < 2.5 μm: number (concentration in µg/m³)
  - Diameter < 10 μm: number (concentration in µg/m³)
- Gasses:
  - CO (carbon monoxide): number (ppb)
  - O3 (ozone): number (ppb)
  - SO2 (sulfur dioxide): number (ppb)
  - NO2 (nitrogen dioxide): number (ppb)

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
  humidity: Number,
  particulateMatter: {
    pm1: Number,
    pm25: Number,
    pm10: Number
  },
  gasses: {
    co: Number,
    o3: Number,
    so2: Number,
    no2: Number
  }
}
```