export default (aqi) => {
  switch (true) {
    case aqi <= 50:
      return {
        color: '#00e400',
        descriptor: 'Good'
      }
    case aqi <= 100:
      return {
        color: '#ffff00',
        descriptor: 'Moderate'
      }
    case aqi <= 150:
      return {
        color: '#ff7e00',
        descriptor: 'Unhealthy for sensitive groups'
      }
    case aqi <= 200:
      return {
        color: '#ff0000',
        descriptor: 'Unhealthy'
      }
    case aqi <= 300:
      return {
        color: '#8f3f97',
        descriptor: 'Very unhealthy'
      }
    default:
      return {
        color: '#7e0023',
        descriptor: 'Hazardous'
      }
  }
}