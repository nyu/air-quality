import theme from '../lib/theme'

export default (props) => (
  <h2>
    {props.children}
    
    <style jsx>{`
      h2 {
        font-size: 1.65em;
        font-weight: ${theme.headingWeight};
        margin-top: ${theme.spacer * 1.4}px;
        margin-bottom: ${theme.spacer}px;
      }
    `}</style>
  </h2>
)