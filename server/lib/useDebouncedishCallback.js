import { useRef } from 'react'

export default (callback, minDelay = 100) => {
  const ref = useRef({
    lastTime: 0,
    lastData: null,
    timeout: null
  })

  return (data) => {
    if (ref.current.timeout) {
      ref.current.lastData = data
      return
    }
    const delay = Date.now() - ref.current.lastTime
    console.log(delay, ref.current.lastTime)
    if (delay >= minDelay) {
      console.log(1)
      callback(data)
      ref.current.lastTime = Date.now()
    } else {
      console.log('2')
      ref.current.lastData = data

      ref.current.timeout = setTimeout(() => {
        callback(ref.current.lastData)
        ref.current.lastTime = Date.now()
        ref.current.timeout = null
      }, minDelay - delay)
    }
  }
}