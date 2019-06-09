import axios from 'axios'

import {Pipeline, PIPELINES_FETCHED,} from './types'
import {SystemState} from '../system/types'

export function pipelinesFetch() {
  // this is a thunk, so it doesn't need an explicit action type
  return (dispatch, getState) => {
    readPipelinesFromBkApi(getState().system.bkApiToken)
      .then((pipelines) => {
        return dispatch({
          type: PIPELINES_FETCHED,
          payload: pipelines
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

async function readPipelinesFromBkApi(bkApiToken: SystemState['bkApiToken']): Promise<Pipeline[]> {
  axios.defaults.baseURL = 'https://graphql.buildkite.com'
  axios.defaults.headers.common['Authorization'] = `Bearer ${bkApiToken}`
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  const query = `
    query {
      organization(slug: tracker) {
        pipelines(first: 99) {
          edges {
            node {
              name,
              uuid
            }
          }
        }
      }
    }
    `
  return await axios.post('v1',
    {query: query},
  ).then((response) => {
    // TODO: it's possible desctructure an array of nodes in the console with [{name, uuid}] = ..., why not here?
    const pipelines = response.data.data.organization.pipelines.edges
      .map(edge => edge.node)
      .map(node => ({name: node.name, uuid: node.uuid}))
    return pipelines
  })
}

