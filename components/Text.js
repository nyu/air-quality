export default (props) => (
  <p>
    {props.children}
    <style jsx>{`
      p {
        margin: 0;
        margin-bottom: 12px;
      }
    `}</style>
  </p>
)