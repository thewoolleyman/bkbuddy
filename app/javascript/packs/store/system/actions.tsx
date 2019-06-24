import {createActionCreator} from 'deox'
import {SystemState} from './state'

export const cablecarConnected = createActionCreator('CABLECAR_CONNECTED')
export const cablecarDisconnected = createActionCreator('CABLECAR_DISCONNECTED')
export const serverUpdateSystemState = createActionCreator('SERVER_UPDATE_SYSTEM_STATE')
export const updateSystemState = createActionCreator(
  'UPDATE_SYSTEM_STATE',
  resolve => (payload: SystemState) => resolve(payload)
)

