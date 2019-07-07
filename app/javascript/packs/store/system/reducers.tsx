import {createReducer} from 'deox'
import {
  cablecarConnected,
  cablecarDisconnected,
  serverReqGetInitialState,
  serverRespSetInitialSystemState
} from './actions'
import {defaultState} from './state'

export const systemReducer = createReducer(defaultState, handleAction => [
  handleAction(cablecarConnected, state => ({...state, connected: true})),
  handleAction(cablecarDisconnected, state => ({...state, connected: false})),
  handleAction(serverReqGetInitialState, _ => _),
  handleAction(serverRespSetInitialSystemState, (_, {payload}) => payload),
])
