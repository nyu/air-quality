import { Context } from '../components/Theme'
import { useContext } from 'react'

export default () => {
  const { theme } = useContext(Context)
  return theme
}