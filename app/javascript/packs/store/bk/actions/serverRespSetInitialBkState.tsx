import {createActionCreator} from 'deox'
import {BkState} from '~/store'

export const serverRespSetInitialBkState = createActionCreator(
  'SERVER_RESP_SET_INITIAL_BK_STATE',
  // SERVER_RESP actions are handled by redux-cablecar, so this is never invoked,
  // it only exists to declare types.  See README.
  resolve => (payload: BkState) => resolve(payload)
)
