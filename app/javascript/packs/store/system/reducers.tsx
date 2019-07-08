import {createReducer} from 'deox'
import {Cablecar, SystemStateInitialize} from './actions'
import {defaultState} from './state'

export const systemReducer = createReducer(defaultState, handleAction => [
  handleAction(Cablecar.connected, state => ({...state, connected: true})),
  handleAction(Cablecar.disconnected, state => ({...state, connected: false})),
  handleAction(SystemStateInitialize.serverAction, _ => _),
  handleAction(SystemStateInitialize.complete, (_, {payload}) => payload),
])
