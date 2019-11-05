export default ({ children }) => (
  <h1>
    {children}

    <style jsx>{`
      h1 {
        font-size: 2.25em;
        padding-bottom: 20px;
      }
    `}</style>
  </h1>
)