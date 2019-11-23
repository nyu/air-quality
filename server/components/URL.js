export default ({ color, children, background }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        margin-top: 100px;
        margin-bottom: 100px;
        color: ${color || 'inherit'};
        background: ${background || 'inherit'};
        text-align: center;
        font-size: xx-large;
      }
    `}</style>
  </p>
)
