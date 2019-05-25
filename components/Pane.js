export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        flex: 1;
        margin-right: 16px;
      }
    `}</style>
  </div>
)