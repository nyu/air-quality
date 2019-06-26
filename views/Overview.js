import { formatPm, formatLocation } from '../lib/formatters'
import capitalize from '../lib/capitalize'

import Subtitle from '../components/Subtitle'
import Grid from '../components/Grid'
import Pane from '../components/Pane'
import Chart from '../components/Chart'
import Text from '../components/Text'

import { Line } from 'recharts'

export default (props) => (
  <Grid>
    {Object.keys(props.data).map((key) => (
      <Pane key={key}>
        <Subtitle>{capitalize(key)}</Subtitle>
        <Text>
          Location: {formatLocation(props.data[key][0].location.latitude, props.data[key][0].location.longitude)}
          <br />
          Time zone: {props.data[key][0].timezones.join(' or ')}
        </Text>

        <Chart data={props.data[key]} formatter={formatPm}>
          <Line dataKey='particulateMatter.pm25' name='pm2.5' />
          <Line dataKey='particulateMatter.pm10' name='pm10' />
        </Chart>
      </Pane>
    ))}
  </Grid>
)