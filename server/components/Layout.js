import Title from './Title'

export default ({ children }) => {
  return (
    <main>
      <Title>Shanghai Air Quality</Title>

      {children}

      <style jsx>{`
        main {
          padding: 16px;
          max-width: 1000px;
          margin: 0 auto;
          font-family: 'Gotham', sans-serif;
          color: #ECEFF4;
        }
      `}</style>
      <style jsx global>{`
        @font-face {
          font-family: 'Gotham';
          font-weight: 400;
          src: url('/static/font/Gotham-Book.otf');
        }
        @font-face {
          font-family: 'Gotham';
          font-weight: 700;
          src: url('/static/font/Gotham-Bold.otf');
        }
        body {
          background-color: #2E3440;
        }
      `}</style>
    </main>
  )
}