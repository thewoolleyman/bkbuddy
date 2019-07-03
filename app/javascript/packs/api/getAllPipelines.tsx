import axios from 'axios'

import {Pipeline} from '~/store'

export async function getAllPipelines(bkApiToken: string): Promise<Pipeline[]> {
  axios.defaults.baseURL = 'https://graphql.buildkite.com'
  axios.defaults.headers.common['Authorization'] = `Bearer ${bkApiToken}`
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  const orgSlug = 'tracker'

  const query = `
    query {
      organization(slug: ${orgSlug}) {
        pipelines(first: 99) {
          edges {
            node {
              name,
              slug
            }
          }
        }
      }
    }
    `
  const {data} = await axios.post('v1',
    {query: query},
  )
  // TODO: it's possible to destructure an array of nodes in the console with [{name, slug}] = ..., why not here?
  return data.data.organization.pipelines.edges
    .map(edge => edge.node)
    .map(node => ({name: node.name, slug: `${orgSlug}/${node.slug}`}))
}

