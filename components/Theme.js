import themes from '../lib/themes'
import { createContext, useState, useEffect } from 'react'

export const Context = createContext()
export default (props) => {
  const [ dark, setDark ] = useState(props.defaultDark)
  useEffect(() => {
    document.cookie = `theme=${dark ? 'glory' : 'suffering'}`
  }, [ dark ])

  const theme = themes[dark ? 'dark' : 'light']
  return (
    <Context.Provider value={{ dark, setDark, theme }}>
      {props.children}
    </Context.Provider>
  )
}