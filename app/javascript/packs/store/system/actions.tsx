import {createActionCreator} from 'deox'
import {SystemState} from './state'

export const cablecarConnected = createActionCreator('CABLECAR_CONNECTED')
export const cablecarDisconnected = createActionCreator('CABLECAR_DISCONNECTED')
export const serverReqGetInitialState = createActionCreator('SERVER_REQ_GET_INITIAL_STATE')
// SERVER_RESP actions are handled by redux-cablecar, so this executor is never invoked,
// it only exists to allow deox to automatically declare types. See README.
export const serverRespSetInitialSystemState = createActionCreator(
  'SERVER_RESP_SET_INITIAL_SYSTEM_STATE',
  resolve => (payload: SystemState) => resolve(payload)
)

