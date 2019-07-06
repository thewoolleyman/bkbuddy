import {Pipeline} from '~/store'

export function sortPipelines(pipelines): Pipeline[] {
  return pipelines.sort((a, b) => (a.name > b.name) ? 1 : -1)
}