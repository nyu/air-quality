const Text = ({ color, children, background }) => <p>
  {children}
  <style jsx>{`
    p {
      margin: 0;
      margin-bottom: 12px;
      color: ${color || 'inherit'};
      background: ${background || 'inherit'};
      text-align: center;
      font-size: large;
    }
  `}</style>
</p>

export default Text