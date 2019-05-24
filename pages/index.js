import getInitial from '../lib/getInitial'
import useData from '../lib/useData'
import useSocket from '../lib/useSocket'
import {
  formatWhen,
  formatTemperature,
  formatRelativeHumidity,
  formatAbsoluteHumidity,
  formatPm,
  formatGas
} from '../lib/formatters'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

const Page = (props) => {
  const [ data, pushData ] = useData(props.initialData, 40)
  useSocket(pushData)
  
  return !data.length ? <h1>Loading...</h1> : <>
    <h1>Air Quality Data - {data[0].name}</h1>

    <h2>Particulate Matter</h2>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='particulateMatter.pm25'
          name='pm2.5'
          stroke='#8884d8'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='particulateMatter.pm5'
          name='pm5'
          stroke='#82ca9d'
          isAnimationActive={false}
        />

        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' tickFormatter={formatWhen} />
        <YAxis tickFormatter={formatPm} />

        <Tooltip formatter={formatPm} />
        <Legend verticalAlign='top' height={36}/>
      </LineChart>
    </ResponsiveContainer>

    <h2>Temperature</h2>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='temperature'
          stroke='#8884d8'
          isAnimationActive={false}
        />

        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' tickFormatter={formatWhen} />
        <YAxis tickFormatter={formatTemperature} />

        <Tooltip formatter={formatTemperature} />
      </LineChart>
    </ResponsiveContainer>

    <h2>Gasses</h2>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='gasses.co2'
          name='co2'
          stroke='#8884d8'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.co'
          name='co'
          stroke='#82ca9d'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.o2'
          name='o2'
          stroke='#116cf6'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.o3'
          name='o3'
          stroke='#d09379'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.ch4'
          name='ch4'
          stroke='#840824'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.so2'
          name='so2'
          stroke='#59f147'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.h2s'
          name='h2s'
          stroke='#ab66f0'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.no'
          name='no'
          stroke='#474f3b'
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='gasses.no2'
          name='no2'
          stroke='#250dac'
          isAnimationActive={false}
        />

        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' tickFormatter={formatWhen} />
        <YAxis tickFormatter={formatGas} />

        <Tooltip formatter={formatGas} />
        <Legend verticalAlign='top' height={36}/>
      </LineChart>
    </ResponsiveContainer>

    <h2>Humidity (Relative)</h2>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='humidity.relative'
          stroke='#8884d8'
          isAnimationActive={false}
        />

        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' tickFormatter={formatWhen} />
        <YAxis tickFormatter={formatRelativeHumidity} />

        <Tooltip formatter={formatRelativeHumidity} />
      </LineChart>
    </ResponsiveContainer>

    <h2>Humidity (Absolute)</h2>
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='humidity.absolute'
          stroke='#8884d8'
          isAnimationActive={false}
        />

        <CartesianGrid stroke='#cccccc' />
        <XAxis dataKey='when' tickFormatter={formatWhen} />
        <YAxis tickFormatter={formatAbsoluteHumidity} />

        <Tooltip formatter={formatAbsoluteHumidity} />
      </LineChart>
    </ResponsiveContainer>
  </>
}

Page.getInitialProps = async () => {
  const initialData = await getInitial()
  return { initialData }
}

export default Page