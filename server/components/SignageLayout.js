import Title from './Title'

const SignageLayout = ({ children }) => {
  return (
    <main>
      <Title>Shanghai Air Quality</Title>

      {children}
      
      <style jsx>{`
        main {
          padding: 0px;
          max-width: 2000px;
          margin: 0px auto;
          font-family: 'Circular Std', sans-serif;
          color: #ECEFF4;
        }
      `}</style>
      <style jsx global>{`
        @font-face {
          font-family: 'Circular Std';
          font-weight: 400;
          src: url('/static/font/Gotham-light.otf');
        }
        @font-face {
          font-family: 'Circular Std';
          font-weight: 700;
          src: url('/static/font/Gotham-book.otf');
        }
        body {
          background-color: #2E3440;
        }
      `}</style>
    </main>
  )
}

export default SignageLayout