import {createReducer} from 'deox'
import {pipelinesFetchAll} from '..'
import {initialState} from './state'

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
