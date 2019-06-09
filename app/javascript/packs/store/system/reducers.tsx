import {
  CABLECAR_CONNECTED,
  CABLECAR_DISCONNECTED,
  SERVER_UPDATE_SYSTEM_STATE,
  SystemActionTypes,
  SystemState,
  UPDATE_SYSTEM_STATE,
} from './types'

const initialState: SystemState = {
  loggedIn: false,
  bkApiToken: '',
  userName: '',
  connected: false,
}

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case CABLECAR_CONNECTED:
      return {
        ...state,
        connected: true
      }

    case CABLECAR_DISCONNECTED:
      return {
        ...state,
        connected: false
      }

    case SERVER_UPDATE_SYSTEM_STATE: {
      return {
        ...state,
      }
    }

    case UPDATE_SYSTEM_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state
  }
}
