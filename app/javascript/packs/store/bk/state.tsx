export interface Pipeline {
  name: string
  uuid: string
}

export interface BkState {
  pipelines: Pipeline[]
}

export const initialState: BkState = {
  pipelines: [],
}

