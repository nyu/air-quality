import theme from '../lib/theme'

export default (props) => (
  <h1>
    {props.children}
    
    <style jsx>{`
      h1 {
        font-size: 2.25em;
        font-weight: ${theme.headingWeight};
      }
    `}</style>
  </h1>
)