import Title from './Title'

export default ({ children }) => {
  return (
    <main>
        <title>NYU Shanghai Live Air Quality Data Dashboard</title>
        <meta name="description" content="Live air quality data from the NYU Shanghai Air Quality Monitoring Network. Built by Caspar Lant, Felix Mattick, NYU Tandon Smart Sensors group, and Prof. Kevin Cromar. Made possible by a Green Grant from the Office of Sustainability."></meta>
      <Title>NYU Shanghai Air Quality</Title>

      {children}

      <style jsx>{`
        main {
          padding: 16px;
          max-width: 1200px;
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