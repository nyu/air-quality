const URL = ({ color, children, background }) => <p>
  {children}
  <style jsx>{`
    p {
      margin-top: 60px;
      margin-bottom: -80px
      color: ${color || 'inherit'};
      background: ${background || 'inherit'};
      text-align: center;
      font-size: xx-large;
    }
  `}</style>
</p>

export default URL
