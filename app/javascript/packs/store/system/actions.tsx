import {createActionCreator} from 'deox'
import {SystemState} from './state'

export const cablecarConnected = createActionCreator('CABLECAR_CONNECTED')
export const cablecarDisconnected = createActionCreator('CABLECAR_DISCONNECTED')
export const serverGetInitialState = createActionCreator('SERVER_GET_INITIAL_STATE')
export const setInitialSystemState = createActionCreator(
  'SET_INITIAL_SYSTEM_STATE',
  resolve => (payload: SystemState) => resolve(payload)
)

