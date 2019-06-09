export interface Pipeline {
  name: string
  uuid: string
}

export interface BkState {
  pipelines: Pipeline[]
}

export const PIPELINES_FETCHED = 'PIPELINES_FETCHED'

interface PipelinesFetchedAction {
  type: typeof PIPELINES_FETCHED
  payload: Pipeline[]
}

export type BkActionTypes =
  PipelinesFetchedAction
