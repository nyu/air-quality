export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        flex: 1;
      }
    `}</style>
  </div>
)