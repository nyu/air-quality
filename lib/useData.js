import { useState } from 'react'

const appendPoint = (data, point) => {
  if (Array.isArray(point)) {
    for (let singlePoint of point) {
      appendPoint(data, singlePoint)
    }
  } else if (point.name in data) {
    data[point.name].push(point)
    if (data[point.name].length > 60) {
      data[point.name].shift()
    }
  } else {
    data[point.name] = [ point ]
  }
  return data
}

export default (initial) => {
  const [ data, setData ] = useState(initial ? appendPoint({}, initial) : {})
  const pushData = (newData) => {
    setData((currentData) => appendPoint({ ...currentData }, newData))
  }
  return [ data, pushData ]
}