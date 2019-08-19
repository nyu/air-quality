import {
  formatTemperature,
  formatHumidity,
  formatPm,
  formatGas,
  formatLocation
} from '../lib/formatters'

import Subtitle from '../components/Subtitle'
import Grid from '../components/Grid'
import Pane from '../components/Pane'
import Chart from '../components/Chart'
import Text from '../components/Text'

import { Line } from 'recharts'

export default (props) => (
  <>
    <Text>
      Location: {formatLocation(props.data[0].location.latitude, props.data[0].location.longitude)}
      <br />
      Time zone: {props.data[0].timezones.join(' or ')}
    </Text>

    <Subtitle>Particulate Matter</Subtitle>
    <Chart data={props.data} formatter={formatPm}>
      <Line dataKey='particulateMatter.pm1' name='pm1' />
      <Line dataKey='particulateMatter.pm25' name='pm2.5' />
      <Line dataKey='particulateMatter.pm10' name='pm10' />
    </Chart>

    <Subtitle>Gasses</Subtitle>
    <Chart data={props.data} formatter={formatGas}>
      <Line dataKey='gasses.co2' name='co2' />
      <Line dataKey='gasses.o3' name='o3' />
      <Line dataKey='gasses.so2' name='so2' />
      <Line dataKey='gasses.no2' name='no2' />
    </Chart>

    <Grid>
      <Pane>
        <Subtitle>Temperature</Subtitle>
        <Chart data={props.data} formatter={formatTemperature}>
          <Line dataKey='temperature' />
        </Chart>
      </Pane>

      <Pane>
        <Subtitle>Relative Humidity</Subtitle>
        <Chart data={props.data} formatter={formatHumidity}>
          <Line dataKey='humidity' />
        </Chart>
      </Pane>
    </Grid>
  </>
)