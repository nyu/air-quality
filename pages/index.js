import getInitial from '../lib/getInitial'
import useData from '../lib/useData'
import useSocket from '../lib/useSocket'
import {
  formatTemperature,
  formatRelativeHumidity,
  formatAbsoluteHumidity,
  formatPm,
  formatGas
} from '../lib/formatters'

import Theme from '../components/Theme'
import Layout from '../components/Layout'
import Subtitle from '../components/Subtitle'
import Split from '../components/Split'
import Pane from '../components/Pane'
import Chart from '../components/Chart'

import cookies from 'next-cookies'
import { Line } from 'recharts'

const Page = (props) => {
  const [ data, pushData ] = useData(props.initialData, 40)
  useSocket(pushData)
  
  return (
    <Theme defaultDark={props.defaultDark}>
      <Layout title={data[0] && data[0].name}>
        <Subtitle>Particulate Matter</Subtitle>
        <Chart data={data} formatter={formatPm}>
          <Line dataKey='particulateMatter.pm25' name='pm2.5' />
          <Line dataKey='particulateMatter.pm5' name='pm5' />
        </Chart>

        <Subtitle>Gasses</Subtitle>
        <Chart data={data} formatter={formatGas}>
          <Line dataKey='gasses.co2' name='co2' />
          <Line dataKey='gasses.co' name='co' />
          <Line dataKey='gasses.o2' name='o2' />
          <Line dataKey='gasses.o3' name='o3' />
          <Line dataKey='gasses.ch4' name='ch4' />
          <Line dataKey='gasses.so2' name='so2' />
          <Line dataKey='gasses.h2s' name='h2s' />
          <Line dataKey='gasses.no' name='no' />
          <Line dataKey='gasses.no2' name='no2' />
        </Chart>

        <Subtitle>Temperature</Subtitle>
        <Chart data={data} formatter={formatTemperature}>
          <Line dataKey='temperature' />
        </Chart>

        <Split>
          <Pane>
            <Subtitle>Humidity (Relative)</Subtitle>
            <Chart data={data} formatter={formatRelativeHumidity}>
              <Line dataKey='humidity.relative' />
            </Chart>
          </Pane>

          <Pane>
            <Subtitle>Humidity (Absolute)</Subtitle>
            <Chart data={data} formatter={formatAbsoluteHumidity}>
              <Line dataKey='humidity.absolute' />
            </Chart>
          </Pane>
        </Split>
      </Layout>
    </Theme>
  )
}

Page.getInitialProps = async (ctx) => {
  const { theme } =  cookies(ctx)
  const defaultDark = theme ? theme === 'glory' : true

  const initialData = await getInitial()
  return { initialData, defaultDark }
}

export default Page