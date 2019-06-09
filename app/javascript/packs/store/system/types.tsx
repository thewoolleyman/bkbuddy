// Describing the shape of the system's slice of state
export interface SystemState {
  loggedIn: boolean
  bkApiToken: string
  userName: string
  connected: boolean
}

// Describing the different ACTION NAMES available
export const CABLECAR_CONNECTED = 'CABLECAR_CONNECTED'
export const CABLECAR_DISCONNECTED = 'CABLECAR_DISCONNECTED'

export const SERVER_UPDATE_SYSTEM_STATE = 'SERVER_UPDATE_SYSTEM_STATE'
export const UPDATE_SYSTEM_STATE = 'UPDATE_SYSTEM_STATE'

interface CablecarConnectedAction {
  type: typeof CABLECAR_CONNECTED
  payload: SystemState
}

interface CablecarDisconnectedAction {
  type: typeof CABLECAR_DISCONNECTED
  payload: SystemState
}

interface ServerUpdateSystemStateAction {
  type: typeof SERVER_UPDATE_SYSTEM_STATE
}

interface UpdateSystemStateAction {
  type: typeof UPDATE_SYSTEM_STATE
  payload: SystemState
}

export type SystemActionTypes =
  CablecarDisconnectedAction |
  CablecarConnectedAction |
  ServerUpdateSystemStateAction |
  UpdateSystemStateAction
