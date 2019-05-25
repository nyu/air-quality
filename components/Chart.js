import useTheme from '../lib/useTheme'
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

export default (props) => {
  const theme = useTheme()
  return (
    <ResponsiveContainer width='100%' height={460}>
      <LineChart data={props.data}>
        {Children.map(props.children, (child, index) => cloneElement(child, {
          type: 'monotone',
          isAnimationActive: false,
          stroke: theme.highlights[index],
          dot: { fill: theme.background },
          activeDot: { stroke: theme.foreground },
          strokeWidth: 2
        }))}

        <CartesianGrid stroke={theme.lines} />
        <XAxis stroke={theme.foreground} dataKey='when' tickFormatter={formatWhen} />
        <YAxis stroke={theme.foreground} tickFormatter={props.formatter} />

        <Tooltip
          formatter={props.formatter}
          separator=': '
          contentStyle={{
            background: theme.background,
            border: `1px solid ${theme.lines}`
          }}
        />
        {Children.count(props.children) > 1 && <Legend verticalAlign='top' height={36}/>}
      </LineChart>
    </ResponsiveContainer>
  )
}