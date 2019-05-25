export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
        grid-gap: 32px;
      }
    `}</style>
  </div>
)