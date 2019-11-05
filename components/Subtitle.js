export default ({ children }) => (
  <h2>
    {children}

    <style jsx>{`
      h2 {
        font-size: 1.5em;
      }
    `}</style>
  </h2>
)