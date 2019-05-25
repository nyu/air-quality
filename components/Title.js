export default (props) => (
  <h1>
    {props.children}
    
    <style jsx>{`
      h1 {
        font-size: 2.25em;
      }
    `}</style>
  </h1>
)