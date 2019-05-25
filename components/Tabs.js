import Tab from './Tab'

export default (props) => (
  <div>
    {props.tabs.map((tab) => (
      <Tab key={tab} tab={tab} setTab={props.setTab} active={tab === props.tab} />
    ))}

    <style jsx>{`
      div {
        margin-bottom: 32px;
      }
    `}</style>
  </div>
)