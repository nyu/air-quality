import {
  formatPm,
  formatGas,
  formatTemperature,
  formatHumidity
} from '../lib/formatters'
import fetchData from '../lib/fetchData'
import fetchAqi from '../lib/fetchAqi'
import useData from '../lib/useData'
import getAqiInfo from '../lib/getAqiInfo'

import Text from '../components/Text'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Plot from '../components/Plot' 

const Page = ({ initialData, aqi }) => {
  const data = useData(initialData)
  const aqiInfo = getAqiInfo(aqi)

  return (<Layout>

    <Section title='Particulate matter'>
      <Plot
        data={data.particulates}
        keys={['pm2p5', 'pm1']}
        labels={['PM2.5', 'PM1']}
        range={[0, 100]}
        formatter={formatPm}
      />
      <Plot
        data={data.particulates}
        keys={['pm10']}
        labels={['PM10']}
        range={[0, 100]}
        padding={100}
        auroraOffset={2}
        formatter={formatPm}
      />
    </Section>

    <Section title='Gases'>
      <Plot
        data={data.gases}
        keys={['CO.cnc']}
        labels={['Carbon monoxide']}
        padding={100}
        formatter={formatGas}
      />
      <Plot
        data={data.gases}
        keys={['NO2.cnc', 'Ox.cnc']} // 'SO2.cnc'
        labels={['Nitrogen dioxide', 'Ozone']} // 'Sulphur dioxide' 
        range={[0, 100]}
        auroraOffset={1}
        formatter={formatGas}
      />
    </Section>

    <Section title='Temperature'>
      <Plot
        data={data.climate}
        keys={['tmp']}
        labels={['Temperature']}
        auroraOffset={2}
        padding={300}
        formatter={formatTemperature}
      />
    </Section>

    <Section title='Relative humidity'>
      <Plot
        data={data.climate}
        keys={['hmd']}
        labels={['Humidity']}
        auroraOffset={1}
        padding={400}
        formatter={formatHumidity}
      />
    </Section>
  </Layout>)
}

Page.getInitialProps = async () => {
  const [initialData, aqi] = await Promise.all([fetchData(), fetchAqi()])
  return { initialData, aqi }
}

export default Page
