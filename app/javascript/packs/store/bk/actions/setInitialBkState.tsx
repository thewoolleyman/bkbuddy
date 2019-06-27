import {createActionCreator} from 'deox'
import {BkState} from '../state'

export const setInitialBkState = createActionCreator(
  'SET_INITIAL_BK_STATE',
  resolve => (payload: BkState) => resolve(payload)
)

