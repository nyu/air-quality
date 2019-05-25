import {
  formatTemperature,
  formatRelativeHumidity,
  formatAbsoluteHumidity,
  formatPm,
  formatGas,
  formatLocation
} from '../lib/formatters'

import Subtitle from '../components/Subtitle'
import Split from '../components/Split'
import Pane from '../components/Pane'
import Chart from '../components/Chart'
import Text from '../components/Text'

import { Line } from 'recharts'

export default (props) => (
  <>
    <Text>
      Location: {props.data[0] && formatLocation(props.data[0].location.latitude, props.data[0].location.longitude)}
      <br />
      Time zone: {props.data[0] && props.data[0].timezones.join(' or ')}
    </Text>

    <Subtitle>Particulate Matter</Subtitle>
    <Chart data={props.data} formatter={formatPm}>
      <Line dataKey='particulateMatter.pm25' name='pm2.5' />
      <Line dataKey='particulateMatter.pm5' name='pm5' />
    </Chart>

    <Subtitle>Gasses</Subtitle>
    <Chart data={props.data} formatter={formatGas}>
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
    <Chart data={props.data} formatter={formatTemperature}>
      <Line dataKey='temperature' />
    </Chart>

    <Split>
      <Pane>
        <Subtitle>Humidity (Relative)</Subtitle>
        <Chart data={props.data} formatter={formatRelativeHumidity}>
          <Line dataKey='humidity.relative' />
        </Chart>
      </Pane>

      <Pane>
        <Subtitle>Humidity (Absolute)</Subtitle>
        <Chart data={props.data} formatter={formatAbsoluteHumidity}>
          <Line dataKey='humidity.absolute' />
        </Chart>
      </Pane>
    </Split>
  </>
)