import runBkGraphqlQuery from '~/api/runBkGraphqlQuery'
import {Step} from '~/store'
import {uniqSteps} from '~/util'

// Because we generate our steps dynamically via an ERB pipeline, we can't retrieve steps (there's
// only one step which invokes the template).  Instead, we "fake" retrieving the steps
// by getting the latest build for the pipeline, then getting all the unique jobs in it.
// Note that jobs may change as the pipeline is edited, but not worrying about that for now.

export async function getPipelineSteps(bkApiToken: string, pipelineSlug: string): Promise<Step[]> {
  const query = `
    query {
      pipeline(slug: "${pipelineSlug}") {
        builds(first: 1, branch: "master") {
          edges {
            node {
              jobs(first: 99) {
                edges {
                  node {
                    ... on JobTypeCommand {
                      label
                      command
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `

  const data = await runBkGraphqlQuery(bkApiToken, query)
  const steps: Step[] = data.data.pipeline.builds.edges[0].node.jobs.edges
    .map(edge => edge.node)
    .map(node => ({label: node.label, command: node.command, pipelineSlug: pipelineSlug}))
  const uniqueSteps = uniqSteps(steps)
  const onlyCommandSteps = uniqueSteps.filter((step) => step.command)
  const reversedSteps = onlyCommandSteps.reverse()
  return reversedSteps.map((step, index) => ({...step, order: index, id: -1}))
}

