export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        display: flex;
      }
    `}</style>
  </div>
)