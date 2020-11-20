const CrosshairBody = ({ hovered, keys, labels, formatter }) => <div className='inner'>
  <strong>{new Date(hovered[0].x).toLocaleString('en-US')}</strong>
  {keys.map((key, index) => (
    <div key={key}>
      {labels[index]}: {formatter(hovered[index].y)}
    </div>
  ))}

  <style jsx>{`
    .inner {
      border-radius: 6px;
      background: #3B4252;
      color: #E5E9F0;
      font-size: 14px;
      padding: 8px 10px;
      width: 180px;
    }
    strong {
      color: #ECEFF4;
    }
  `}</style>
  <style jsx global>{`
    .rv-crosshair {
      position: absolute;
      font-size: 14px;
      pointer-events: none;
      transition: left 200ms;
      z-index: 99;
    }

    .rv-crosshair__line {
      background-color: #88C0D0;
      width: 1px;
    }

    .rv-crosshair__inner--left {
      right: 4px;
    }

    .rv-crosshair__inner--right {
      left: 4px;
    }

    .rv-crosshair__inner {
      position: absolute;
      text-align: left;
      top: 0;
    }
  `}</style>
  {console.log('rendered')}
</div>

export default CrosshairBody