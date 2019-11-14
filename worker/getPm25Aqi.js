const calculate = (aqiHigh, aqiLow, cHigh, cLow, c) => {
  return Math.round(((c - cLow) / (cHigh - cLow)) * (aqiHigh - aqiLow) + aqiLow)
}

module.exports.getAqiFromAverage = (c) => {
  switch (true) {
    case (c >= 0 && c < 12.1):
      return calculate(50, 0, 12, 0, c)
    case (c >= 12.1 && c < 35.5):
      return calculate(100, 51, 35.4, 12.1, c)
    case (c >= 35.5 && c < 55.5):
      return calculate(150, 101, 55.4, 35.5, c)
    case (c >= 55.5 && c < 150.5):
      return calculate(200, 151, 150.4, 55.5, c)
    case (c >= 150.5 && c < 250.5):
      return calculate(300, 201, 250.4, 150.5, c)
    case (c >= 250.5 && c < 350.5):
      return calculate(400, 301, 350.4, 250.5, c)
    case (c >= 350.5 && c < 500.5):
      return calculate(500, 401, 500.4, 350.5, c)
    default:
      return 1000
  }
}

module.exports.averagePoints = (points) => points.reduce((p, c) => p + c.pm25, 0) / points.length