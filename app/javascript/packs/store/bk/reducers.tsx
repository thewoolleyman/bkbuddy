import {createReducer} from 'deox'
import {sortPipelines} from '~/store'
import {monitoredPipelineCreate, monitoredPipelineDelete, pipelinesFetchAll, setInitialBkState} from './actions'
import {defaultState} from './state'

export const bkReducer = createReducer(defaultState, handleAction => [
  handleAction(setInitialBkState, (state, {payload: payload}) => ({...state, ...payload})),
  handleAction(pipelinesFetchAll.complete, (state, {payload}) => ({...state, pipelines: payload})),
  handleAction(monitoredPipelineCreate.complete, (state, {payload: payload}) =>
    ({
      ...state,
      monitoredPipelines: sortPipelines([...state.monitoredPipelines, payload.pipeline])
    })),
  handleAction(monitoredPipelineDelete.complete, (state, {payload: payload}) =>
    ({
      ...state,
      monitoredPipelines: state.monitoredPipelines.filter((p) => p.uuid !== payload.uuid),
    })),
])
