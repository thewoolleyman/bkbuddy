import {createReducer} from 'deox'
import {cablecarConnected, cablecarDisconnected, serverGetInitialState, setInitialSystemState} from './actions'
import {defaultState} from './state'

export const systemReducer = createReducer(defaultState, handleAction => [
  handleAction(cablecarConnected, state => ({...state, connected: true})),
  handleAction(cablecarDisconnected, state => ({...state, connected: false})),
  handleAction(serverGetInitialState, _ => _),
  handleAction(setInitialSystemState, (_, {payload: payload}) => payload),
])
