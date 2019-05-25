import getInitial from '../lib/getInitial'
import useData from '../lib/useData'
import useSocket from '../lib/useSocket'
import capitalize from '../lib/capitalize'

import Theme from '../components/Theme'
import Layout from '../components/Layout'
import Tabs from '../components/Tabs'

import DetailView from '../views/Detail'

import { useState } from 'react'
import cookies from 'next-cookies'

const View = (props) => {
  if (props.tab === 'overview') {
    return null
  } else {
    return <DetailView data={props.data[props.tab]} />
  }
}

const Page = (props) => {
  const [ tab, setTab ] = useState('overview')
  const [ data, pushData ] = useData(props.initialData)
  useSocket(pushData)
  
  return (
    <Theme defaultDark={props.defaultDark}>   
      <Layout title={capitalize(tab)}>
        <Tabs tab={tab} setTab={setTab} tabs={[ 'overview', ...Object.keys(data) ]} />
        <View tab={tab} data={data} />
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