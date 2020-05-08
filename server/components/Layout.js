import Title from './Title'
import Text from './Text'
import Link from './Link'

export default ({ children }) => {
  return (
    <main>
      <title>NYU Shanghai Live Air Quality Data Dashboard</title>
      <meta name='description' content='Live air quality data from the NYU Shanghai Air Quality Monitoring Network. Built by Caspar Lant, Felix Mattick, NYU Tandon Smart Sensors group, and Prof. Kevin Cromar. Made possible by a Green Grant from the Office of Sustainability.'></meta>
      
      <Title>NYU Shanghai Air Quality</Title>

      {children}

      <Text>
        NYU Shanghai Air Quality Monitoring Network <br/>
        Built by Caspar Lant, Felix Mattick, NYU Tandon Smart Sensors group, and Prof. Kevin Cromar <br/>
        Made possible by a Green Grant from the Office of Sustainability
      </Text>

      <Text>
        <Link href='/api/csv/gases' download='gases.csv'>Download Gas CSV</Link><br />
        <Link href='/api/csv/particulates' download='particulates.csv'>Download Particulates CSV</Link><br />
        <Link href='/api/csv/climate' download='climate.csv'>Download Climate CSV</Link>
      </Text>

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