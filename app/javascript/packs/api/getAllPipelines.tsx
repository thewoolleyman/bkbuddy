import runBkGraphqlQuery from '~/api/runBkGraphqlQuery'
import {orgSlug} from '~/api/vars'
import {Pipeline} from '~/store'
import {sortPipelines} from '~/util'

export async function getAllPipelines(bkApiToken: string): Promise<Pipeline[]> {
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
  const data = await runBkGraphqlQuery(bkApiToken, query)
  // TODO: it's possible to destructure an array of nodes in the console with [{name, slug}] = ..., why not here?
  const pipelines = data.data.organization.pipelines.edges
    .map(edge => edge.node)
    .map(node => ({name: node.name, slug: `${orgSlug}/${node.slug}`}))
  return sortPipelines(pipelines)
}

