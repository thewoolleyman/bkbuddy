import {Pipeline, Step} from '~/store'

export function sortPipelines(pipelines): Pipeline[] {
  return pipelines.sort((a, b) => (a.name > b.name) ? 1 : -1)
}

export function stepsForPipeline(steps: Step[], pipelineSlug: string) {
  return steps.filter((step) => step.pipelineSlug === pipelineSlug)
}