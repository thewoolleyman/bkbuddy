import {createActionCreator} from 'deox'
import {BkState} from '~/store'

export const setInitialBkState = createActionCreator(
  'SET_INITIAL_BK_STATE',
  resolve => (payload: BkState) => resolve(payload)
)

