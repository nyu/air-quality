import { useState } from 'react'

export default (initial = [], limit) => {
  const [ data, setData ] = useState(initial)
  const pushData = (newData) => {
    setData((currentData) => {
      const finalData = currentData.concat(newData)
      if (limit && finalData.length > limit) {
        finalData.shift()
      }
      return finalData
    })
  }
  return [ data, pushData ]
}