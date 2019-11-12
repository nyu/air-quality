export const getDescriptor = (aqi) => aqi <= 50
  ? 'Good'
  : aqi <= 100
    ? 'Moderate'
    : aqi <= 150
      ? 'Unhealthy for Sensitive Groups'
      : aqi <= 200
        ? 'Unhealthy'
        : aqi <= 300
          ? 'Very Unhealthy'
          : 'Hazardous'

export const getColor = (aqi) => aqi <= 50
  ? '#00e400' //green
  : aqi <= 100
    ? '#ffff00' //yellow
    : aqi <= 150
      ? '#ff7e00' //orange
      : aqi <= 200
        ? '#ff0000' //red
        : aqi <= 300
          ? '#8f3f97' //purple
          : '#7e0023' //maroon
