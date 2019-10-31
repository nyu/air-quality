import Title from './Title'

export default (props) => {
  return (
    <main>
      <Title>New API POC</Title>

      {props.children}

      <style jsx>{`
        main {
          padding: 16px;
          max-width: 1600px;
          margin: 0 auto;
          font-family: 'Circular Std', sans-serif;
          color: #212529;
        }
      `}</style>
      <style jsx global>{`
        @font-face {
          font-family: 'Circular Std';
          font-weight: 400;
          src: url('/static/CircularStd-Book.ttf');
        }
        @font-face {
          font-family: 'Circular Std';
          font-weight: 700;
          src: url('/static/CircularStd-Bold.ttf');
        }
      `}</style>
    </main>
  )
}