import {
  formatPm,
  formatGas,
  formatTemperature,
  formatHumidity
} from '../lib/formatters'
import fetchData from '../lib/fetchData'
import useData from '../lib/useData'

import Layout from '../components/Layout'
import Section from '../components/Section'
import Plot from '../components/Plot'

const Page = ({ initialData }) => {
  const data = useData(initialData)

  return (<Layout>
    <Section title='Particulate matter'>
      <Plot
        data={data.particulates}
        keys={['pm2p5', 'pm1']}
        labels={['PM2.5', 'PM1']}
        range={[0, 16]}
        formatter={formatPm}
      />
      <Plot
        data={data.particulates}
        keys={['pm10']}
        labels={['PM10']}
        auroraOffset={2}
        range={[0, 40]}
        formatter={formatPm}
      />
    </Section>

    <Section title='Gases'>
      <Plot
        data={data.gases}
        keys={['CO.cnc']}
        labels={['Carbon monoxide']}
        formatter={formatGas}
      />
      <Plot
        data={data.gases}
        keys={['NO2.cnc', 'Ox.cnc', 'SO2.cnc']}
        labels={['Nitrogen dioxide', 'Ozone', 'Sulphur dioxide']}
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
        range={[15, 30]}
        formatter={formatTemperature}
      />
    </Section>

    <Section title='Relative humidity'>
      <Plot
        data={data.climate}
        keys={['hmd']}
        labels={['Humidity']}
        auroraOffset={1}
        range={[30, 70]}
        formatter={formatHumidity}
      />
    </Section>
  </Layout>)
}

Page.getInitialProps = async () => {
  const initialData = await fetchData()
  return { initialData }
}

export default Page