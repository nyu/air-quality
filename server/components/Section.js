import Subtitle from './Subtitle'

export default ({ title, children }) => {
  return (
    <section>
      <Subtitle>{title}</Subtitle>

      {children}

      <style jsx>{`
        section {
          margin-bottom: 40px;
        }
      `}</style>
    </section>
  )
}