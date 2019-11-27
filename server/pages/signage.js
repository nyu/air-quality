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
import Layout from '../components/SignageLayout'
import Section from '../components/Section'
import Plot from '../components/Plot'
import URL from '../components/URL'

const Page = ({ initialData, aqi }) => {
  const data = useData(initialData)
  const aqiInfo = getAqiInfo(aqi)
  
  return (<Layout>

    <Text color={aqiInfo.onColor} background={aqiInfo.color}>
      The AQI is Currently {aqi}: {aqiInfo.descriptor}
    </Text>
    
    <Section title='Particulate matter' id='particulate-matter'>
      <Plot
        data={data.particulates}
        keys={['pm2p5', 'pm1']}
        labels={['PM2.5', 'PM1']}
        range={[0, 40]}
        padding={undefined}
        formatter={formatPm}
        // height={200}
      />
      <Plot
        data={data.particulates}
        keys={['pm10']}
        labels={['PM10']}
        range={[0, 100]}
        padding={100}
        auroraOffset={2}
        formatter={formatPm}
        // height={200}
      />
    </Section>

    <URL>
      airquality.engineering.nyu.edu
      </URL>    

    <Text>
      NYU Shanghai Air Quality Monitoring Network<br></br>
      Built by Caspar Lant, Felix Mattick, NYU Tandon Sensors group, and Prof. Kevin Cromar <br></br>
      Made possible by a Green Grant from the Office of Sustainability
      </Text>

    <Section title='Gases' id='gases'>
      <Plot
        data={data.gases}
        keys={['CO.cnc']}
        labels={['Carbon monoxide']}
        padding={100}
        formatter={formatGas}
        height={263}
      />
      <Plot
        data={data.gases}
        keys={['NO2.cnc']} // 'SO2.cnc'
        labels={['Nitrogen dioxide']} // 'Sulphur dioxide' 
        range={[0, 100]}
        auroraOffset={1}
        formatter={formatGas}
        height={263}
      />
      <Plot
        data={data.gases}
        keys={['Ox.cnc']} // 'SO2.cnc'
        labels={['Ozone']} // 'Sulphur dioxide' 
        range={[0, 100]}
        auroraOffset={2}
        formatter={formatGas}
        height={263}
      />
    </Section>
    <Section/>

    <URL>
      airquality.engineering.nyu.edu
      </URL>    

    <Text>
      NYU Shanghai Air Quality Monitoring Network<br></br>
      Built by Caspar Lant, Felix Mattick, NYU Tandon Sensors group, and Prof. Kevin Cromar <br></br>
      Made possible by a Green Grant from the Office of Sustainability
      </Text>

    <Section title='Temperature' id='temperature'>
      <Plot
        data={data.climate}
        keys={['tmp']}
        labels={['Temperature']}
        auroraOffset={2}
        padding={400}
        height={370}
        formatter={formatTemperature}
      />
    </Section>

    <Section title='Relative humidity' id='relative-humidity'>
      <Plot
        data={data.climate}
        keys={['hmd']}
        labels={['Humidity']}
        auroraOffset={1}
        padding={400}
        height={370}
        formatter={formatHumidity}
      />
    </Section>

    <URL>
      airquality.engineering.nyu.edu
      </URL>    

    <Text>
      NYU Shanghai Air Quality Monitoring Network<br></br>
      Built by Caspar Lant, Felix Mattick, NYU Tandon Sensors group, and Prof. Kevin Cromar <br></br>
      Made possible by a Green Grant from the Office of Sustainability
      <br/><br/><br/>
      </Text>

  </Layout>)
}

Page.getInitialProps = async () => {
  const [initialData, aqi] = await Promise.all([fetchData(), fetchAqi()])
  return { initialData, aqi }
}

export default Page
