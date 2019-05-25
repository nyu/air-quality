import useTheme from '../lib/useTheme'

import Title from './Title'
import ThemeToggle from './ThemeToggle'

export default (props) => {
  const theme = useTheme()
  return (
    <main>
      <Title>
        <ThemeToggle />
        Air Quality - {props.title}
      </Title>
      {props.children}

      <style jsx>{`
        main {
          padding: 16px;
          max-width: 1600px;
          margin: 0 auto;
          color: ${theme.foreground};
          font-family: 'Lato', sans-serif;
        }
      `}</style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
        body {
          margin: 0;
          height: 100vh;
          background: ${theme.background};
        }
      `}</style>
    </main>
  )
}