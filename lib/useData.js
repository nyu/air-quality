import { useState, useEffect } from 'react'
import fetchData from './fetchData'

export default (initialData = []) => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(async () => {
      setData(await fetchData())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return data
}