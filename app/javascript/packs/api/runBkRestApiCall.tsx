import axios from 'axios'
import {restBaseURL} from '~/api/vars'

// can be enhanced to do other actions/data if needed, for now just does a get with no body
export default async function runBkRestApiCall(bkApiToken: string, url: string) {
  axios.defaults.baseURL = restBaseURL
  axios.defaults.headers.common['Authorization'] = `Bearer ${bkApiToken}`
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  const {data} = await axios.get(url)
  return data
}

