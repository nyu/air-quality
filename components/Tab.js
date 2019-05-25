import useTheme from '../lib/useTheme'
import capitalize from '../lib/capitalize'

export default (props) => {
  const theme = useTheme()
  return (
    <button onClick={() => props.setTab(props.tab)}>
      {capitalize(props.tab)}

      <style jsx>{`
        button {
          border: none;
          padding: 16px;
          background: ${props.active ? theme.button.background : 'transparent'};
          color: ${props.active ? theme.button.foreground : theme.foreground};
          font-size: inherit;
          font-family: inherit;
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}