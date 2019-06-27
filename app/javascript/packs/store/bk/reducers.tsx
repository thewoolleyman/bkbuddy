import {createReducer} from 'deox'
import {defaultState} from './state'
import {setInitialBkState} from './actions/setInitialBkState'
import {pipelinesFetchAll} from './actions/pipelinesFetchAll'
import {monitoredPipelineCreate} from './actions/monitoredPipelineCreate'
import {monitoredPipelineDelete} from './actions/monitoredPipelineDelete'

export const bkReducer = createReducer(defaultState, handleAction => [
  handleAction(setInitialBkState, (state, {payload: payload}) => ({...state, ...payload})),
  handleAction(pipelinesFetchAll.complete, (state, {payload}) => ({...state, pipelines: payload})),
  handleAction(monitoredPipelineCreate.complete, (state, {payload: payload}) =>
    ({
      ...state,
      monitoredPipelines: [...state.monitoredPipelines, payload.pipeline]
    })),
  handleAction(monitoredPipelineDelete.complete, (state, {payload: payload}) =>
    ({
      ...state,
      monitoredPipelines: state.monitoredPipelines.filter((p) => p.uuid !== payload.uuid),
    })),
])
