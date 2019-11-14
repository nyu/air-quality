export default (aqi) => {
  switch (true) {
    case aqi <= 50:
      return {
        color: '#00e400',
        onColor: '#000000',
        descriptor: 'Good'
      }
    case aqi <= 100:
      return {
        color: '#ffff00',
        onColor: '#000000',
        descriptor: 'Moderate'
      }
    case aqi <= 150:
      return {
        color: '#f58a00',
        onColor: '#ffffff',
        descriptor: 'Unhealthy for sensitive groups'
      }
    case aqi <= 200:
      return {
        color: '#ff0000',
        onColor: '#ffffff',
        descriptor: 'Unhealthy'
      }
    case aqi <= 300:
      return {
        color: '#8f3f97',
        onColor: '#ffffff',
        descriptor: 'Very unhealthy'
      }
    default:
      return {
        color: '#7e0023',
        onColor: '#ffffff',
        descriptor: 'Hazardous'
      }
  }
}