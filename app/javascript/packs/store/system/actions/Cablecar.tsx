import {createActionCreator} from 'deox'

export const Cablecar = {
  connected: createActionCreator('CABLECAR_CONNECTED'),
  disconnected: createActionCreator('CABLECAR_DISCONNECTED')
}
