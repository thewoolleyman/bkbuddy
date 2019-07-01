import axios from 'axios'
import {graphQlBaseURL} from '~/api/vars'

export default async function runBkGraphqlQuery(bkApiToken: string, query: string) {
  axios.defaults.baseURL = graphQlBaseURL
  axios.defaults.headers.common['Authorization'] = `Bearer ${bkApiToken}`
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  const {data} = await axios.post('v1',
    {query: query},
  )
  return data
}

