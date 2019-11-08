export default ({ color, children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        margin: 0;
        margin-bottom: 12px;
        color: ${color || 'inherit'};
      }
    `}</style>
  </p>
)
