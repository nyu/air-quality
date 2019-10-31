import fetchData from '../lib/fetchData'
import useData from '../lib/useData'

import Layout from '../components/Layout'
import Text from '../components/Text'

const Page = ({ initialData }) => {
  const data = useData(initialData)

  return (
    <Layout>
      {data.reverse().map((point) => (
        <Text>
          <strong>{new Date(point.payload.rec).toLocaleString('en-US')}</strong>
          {Object.keys(point.payload.val).map((key) => (<>
            <br />
            {key}: {point.payload.val[key]}
          </>))}
        </Text>
      ))}
    </Layout>
  )
}

Page.getInitialProps = async (ctx) => {
  const initialData = await fetchData()
  return { initialData }
}

export default Page