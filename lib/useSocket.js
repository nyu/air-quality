import io from 'socket.io-client'
import { useEffect } from 'react'

export default (pushData) => {
  useEffect(() => {
    const socket = io()
    socket.on('data', (data) => pushData(data))
    return () => socket.close()
  }, [])
}