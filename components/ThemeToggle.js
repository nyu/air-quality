import { Context } from './Theme'
import { useContext } from 'react'

export default () => {
  const { dark, setDark, theme } = useContext(Context)
  return (
    <button title={`Use ${dark ? 'light' : 'dark'} theme`} onClick={() => setDark(!dark)}>
      <style jsx>{`
        button {
          width: 30px;
          height: 30px;
          margin-right: 16px;
          border: none;
          background: ${theme.button.background};
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}