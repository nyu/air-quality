export const formatWhen = (when) => new Date(when).toLocaleTimeString('en-US')
export const formatTemperature = (temperature) => `${temperature} °C`
export const formatHumidity = (relativeHumidity) => `${relativeHumidity}%`
export const formatPm = (pm) => `${pm} µg/m³`
export const formatGas = (gas) => `${gas} ppb`
export const formatLocation = (lat, long) => `${
  Math.abs(lat).toFixed(4)
}° ${lat >= 0 ? 'N' : 'S'}, ${
  Math.abs(long).toFixed(4)
}° ${long >= 0 ? 'E' : 'W'}`