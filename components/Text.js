export default (props) => (
  <p>
    {props.children}
    <style jsx>{`
      p {
        margin: 0;
      }
    `}</style>
  </p>
)