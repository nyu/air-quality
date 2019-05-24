import getInitial from '../lib/getInitial'
import useData from '../lib/useData'
import useSocket from '../lib/useSocket'

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const Page = (props) => {
  const [ data, pushData ] = useData(props.initialData, 40)
  useSocket(pushData)
  
  return <>
    <h1>Air Quality Data</h1>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='humidity'
          stroke='#8884d8'
          isAnimationActive={false}
        />
        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='temperature'
          stroke='#8884d8'
          isAnimationActive={false}
        />
        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </>
}

Page.getInitialProps = async () => {
  const initialData = await getInitial()
  return { initialData }
}

export default Page