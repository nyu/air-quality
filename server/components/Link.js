const Link = ({ children, ...props }) => <a {...props}>
  {children}

  <style jsx>{`
    a {
      text-decoration: none;
      color: #55a7d6;
    }

    a:hover {
      text-decoration: underline;
    }
  `}</style>
</a>

export default Link