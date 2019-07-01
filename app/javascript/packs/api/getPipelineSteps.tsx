import runBkGraphqlQuery from '~/api/runBkGraphqlQuery'
import {Step} from '~/store'

// Because we generate our steps dynamically via an ERB pipeline, we can't retrieve steps (there's
// only one step which invokes the template).  Instead, we "fake" retrieving the steps
// by getting the latest build for the pipeline, then getting all the unique jobs in it.
// Note that jobs may change as the pipeline is edited, but not worrying about that for now.

function uniqJobs(jobs: Step[]) {
  // https://stackoverflow.com/a/9229821/25192
  const seen = new Set();
  return jobs.filter(job => {
    return seen.has(job.command) ? false : seen.add(job.command);
  });
}

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
  const jobs: Step[] = data.data.pipeline.builds.edges[0].node.jobs.edges
    .map(edge => edge.node)
    .map(node => ({label: node.label, command: node.command, pipelineSlug: pipelineSlug}))
  const uniqueJobs = uniqJobs(jobs)
  const onlyCommandJobs = uniqueJobs.filter((job) => job.command)
  const reversedJobs = onlyCommandJobs.reverse()
  return reversedJobs.map((job, index) => ({...job, order: index, id: -1}))
}

