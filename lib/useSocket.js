import formatData from './formatData'

import io from 'socket.io-client'
import { useEffect } from 'react'

export default (pushData) => {
  useEffect(() => {
    const socket = io()
    socket.on('data', (data) => pushData(formatData(data)))
    return () => socket.close()
  }, [])
}