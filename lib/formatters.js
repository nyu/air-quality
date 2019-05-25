export const formatWhen = (when) => new Date(when).toLocaleTimeString('en-US')
export const formatTemperature = (temperature) => `${temperature} °C`
export const formatRelativeHumidity = (relativeHumidity) => `${relativeHumidity}%`
export const formatAbsoluteHumidity = (absoluteHumidity) => `${absoluteHumidity} kg/m3`
export const formatPm = (pm) => `${pm} μm`
export const formatGas = (gas) => `${gas} ppm`
export const formatLocation = (lat, long) => `${
  Math.abs(lat).toFixed(4)
}° ${lat >= 0 ? 'N' : 'S'}, ${
  Math.abs(long).toFixed(4)
}° ${long >= 0 ? 'E' : 'W'}`