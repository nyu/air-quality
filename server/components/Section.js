import Subtitle from './Subtitle'

const Section = ({ title, id = undefined, children }) => {
  return (
    <section id={id}>
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

export default Section