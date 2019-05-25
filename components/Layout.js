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
          font-family: 'Circular Std', sans-serif;
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
        body {
          margin: 0;
          height: 100vh;
          background: ${theme.background};
          overflow-y: scroll;
        }
      `}</style>
    </main>
  )
}