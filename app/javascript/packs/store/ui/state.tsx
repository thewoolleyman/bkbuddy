export interface UiState {
  errors: Error[],
  fetchingAllPipelines: boolean,
}

export const defaultState: UiState = {
  errors: [],
  fetchingAllPipelines: false,
}

