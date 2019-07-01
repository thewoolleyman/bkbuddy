export interface Pipeline {
  name: string
  slug: string
}

export interface Step {
  id: number
  pipelineSlug: string
  order: number
  label: string
  command: string
}

export interface BkState {
  emojis: {}
  monitoredPipelines: Pipeline[]
  pipelines: Pipeline[]
  steps: Step[]
}

export const defaultState: BkState = {
  emojis: {},
  monitoredPipelines: [],
  pipelines: [],
  steps: [],
}

