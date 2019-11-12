export default ({ color, children, background }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        margin: 0;
        border-radius: 6px;
        margin-bottom: 12px;
        color: ${color || 'inherit'};
        background: ${background || 'inherit'};
        text-align: center;
        font-size: large;
      }
    `}</style>
  </p>
)
