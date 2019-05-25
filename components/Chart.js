import theme from '../lib/theme'
import { formatWhen } from '../lib/formatters'

import { Children, cloneElement } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

export default (props) => (
  <ResponsiveContainer width='100%' height={460}>
    <LineChart data={props.data}>
      {Children.map(props.children, (child, index) => cloneElement(child, {
        type: 'monotone',
        isAnimationActive: false,
        stroke: theme.dark.highlights[index],
        dot: { fill: theme.dark.background },
        strokeWidth: 2
      }))}

      <CartesianGrid stroke={theme.dark.lines} />
      <XAxis stroke={theme.dark.foreground} dataKey='when' tickFormatter={formatWhen} />
      <YAxis stroke={theme.dark.foreground} tickFormatter={props.formatter} />

      <Tooltip
        formatter={props.formatter}
        separator=': '
        contentStyle={{
          background: theme.dark.background,
          border: `1px solid ${theme.dark.lines}`
        }}
      />
      {Children.count(props.children) > 1 && <Legend verticalAlign='top' height={36}/>}
    </LineChart>
  </ResponsiveContainer>
)