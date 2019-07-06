import {Step} from '~/store'

export function stepsForPipeline(steps: Step[], pipelineSlug: string) {
  return steps.filter((step) => step.pipelineSlug === pipelineSlug)
}