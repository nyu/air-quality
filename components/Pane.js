import theme from '../lib/theme'

export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        flex: 1;
        margin-right: ${theme.spacer}px;
      }
    `}</style>
  </div>
)