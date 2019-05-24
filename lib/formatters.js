export const formatWhen = (when) => new Date(when).toLocaleTimeString('en-US')
export const formatTemperature = (temperature) => `${temperature} °C`
export const formatRelativeHumidity = (relativeHumidity) => `${relativeHumidity}%`
export const formatAbsoluteHumidity = (absoluteHumidity) => `${absoluteHumidity} kg/m3`
export const formatPm = (pm) => `${pm} μm`
export const formatGas = (gas) => `${gas} ppm`