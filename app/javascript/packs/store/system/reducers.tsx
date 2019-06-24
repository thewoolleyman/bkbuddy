import {createActionCreator, createReducer} from 'deox'
import {initialState, SystemState} from './state'
import {cablecarConnected, cablecarDisconnected, serverUpdateSystemState, updateSystemState} from './actions'

export const systemReducer = createReducer(initialState, handleAction => [
  handleAction(cablecarConnected, state => ({...state, connected: true})),
  handleAction(cablecarDisconnected, state => ({...state, connected: false})),
  handleAction(serverUpdateSystemState, _ => _),
  handleAction(updateSystemState, (_, {payload: payload}) => payload),
])
