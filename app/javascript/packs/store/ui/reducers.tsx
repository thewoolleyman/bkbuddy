import {createReducer} from 'deox'
import {initialState} from './state'
import {pipelinesFetchAll} from '..'

export const uiReducer = createReducer(
  initialState,
  handleAction => [
    handleAction(pipelinesFetchAll.next, state => ({...state, fetchingAllPipelines: true})),
    handleAction([pipelinesFetchAll.complete, pipelinesFetchAll.error], state => ({
      ...state,
      fetchingAllPipelines: false
    })),
  ]
)
