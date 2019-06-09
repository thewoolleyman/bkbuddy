import {BkActionTypes, BkState, PIPELINES_FETCHED,} from './types'

const initialState: BkState = {
  pipelines: [],
}

export function bkReducer(
  state = initialState,
  action: BkActionTypes
): BkState {
  switch (action.type) {
    case PIPELINES_FETCHED:
      return {
        ...state,
        pipelines: action.payload,
      }
    default:
      return state
  }
}
