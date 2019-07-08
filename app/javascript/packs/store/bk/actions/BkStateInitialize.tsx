import {createActionCreator} from 'deox'
import {BkState} from '~/store'

export const BkStateInitialize = {
  complete: createActionCreator(
    'ServerResp:BkStateInitialize:Complete',
    // 'ServerResp:...' actions are handled by redux-cablecar, so this executor is never invoked,
    // it only exists to allow deox to automatically declare types. See README.
    resolve => (payload: BkState) => resolve(payload)
  )
}