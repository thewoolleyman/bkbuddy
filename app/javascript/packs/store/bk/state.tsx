export interface Pipeline {
  name: string
  slug: string
}

export interface BkState {
  monitoredPipelines: Pipeline[]
  pipelines: Pipeline[]
}

export const defaultState: BkState = {
  monitoredPipelines: [],
  pipelines: [],
}

