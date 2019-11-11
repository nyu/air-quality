export default (aqi) => aqi <= 50
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
