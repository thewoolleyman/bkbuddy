import {createReducer} from 'deox'
import {pipelinesFetchAll} from '..'
import {defaultState} from './state'

export const uiReducer = createReducer(
  defaultState,
  handleAction => [
    handleAction(pipelinesFetchAll.next, state => ({
      ...state,
      fetchingAllPipelines: true
    })),
    handleAction([pipelinesFetchAll.complete, pipelinesFetchAll.error], state => ({
      ...state,
      fetchingAllPipelines: false
    })),
  ]
)
