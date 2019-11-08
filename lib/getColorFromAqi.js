export default (aqi) => aqi <= 50
  ? 'green'
  : aqi <= 100
    ? 'yellow'
    : aqi <= 150
      ? 'orange'
      : aqi <= 200
        ? 'red'
        : aqi <= 300
          ? 'purple'
          : 'maroon'
