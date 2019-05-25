import theme from '../lib/theme'
import Title from '../components/Title'

export default (props) => (
  <main>
    <Title>
      Air Quality - {props.title}
    </Title>
    {props.children}

    <style jsx>{`
      main {
        padding: ${theme.spacer}px;
        max-width: 1600px;
        margin: 0 auto;
        color: ${theme.dark.foreground};
        font-family: 'Lato', sans-serif;
      }
    `}</style>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
      body {
        margin: 0;
        height: 100vh;
        background: ${theme.dark.background};
      }
    `}</style>
  </main>
)