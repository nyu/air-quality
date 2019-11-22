import {
  formatPm,
  formatGas,
  formatTemperature,
  formatHumidity
} from '../lib/formatters'
import fetchData from '../lib/fetchData'
import useData from '../lib/useData'

import Text from '../components/Text'
import Layout from '../components/SignageLayout'
import Section from '../components/Section'
import Plot from '../components/Plot'
import URL from '../components/URL'

const Page = ({initialData}) => {
  const data = useData(initialData)

  return (<Layout>

    <Section title='Particulate matter' id='particulate-matter'>
      <Plot
        data={data.particulates}
        keys={['pm2p5', 'pm1']}
        labels={['PM2.5', 'PM1']}
        formatter={formatPm}
      />
      <Plot
        data={data.particulates}
        keys={['pm10']}
        labels={['PM10']}
        auroraOffset={2}
        formatter={formatPm}
      />
    </Section>

    <URL font-size='x-large' margin-top='150px'>
      airquality.engineering.nyu.edu
      </URL>    

    <Section title='Gases' id='gases'>
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

    <Section title='Temperature' id='temperature'>
      <Plot
        data={data.climate}
        keys={['tmp']}
        labels={['Temperature']}
        auroraOffset={2}
        formatter={formatTemperature}
      />
    </Section>

    <Section title='Relative humidity' id='relative-humidity'>
      <Plot
        data={data.climate}
        keys={['hmd']}
        labels={['Humidity']}
        auroraOffset={1}
        formatter={formatHumidity}
      />
    </Section>
  </Layout>)
}

Page.getInitialProps = async () => {
  const [initialData] = await Promise.all([fetchData()])
  return { initialData}
}

export default Page
