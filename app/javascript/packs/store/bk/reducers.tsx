import {createReducer} from 'deox'
import {initialState} from './state'
import {pipelinesFetchAll} from './actions/pipelinesFetchAll'

export const bkReducer = createReducer(initialState, handleAction => [
  handleAction(pipelinesFetchAll.complete, (state, {payload}) => ({...state, pipelines: payload})),
])
