import {createActionCreator} from 'deox'
import {ActionLifecycleMap, SystemState} from '~/store'

export const SystemStateInitialize: ActionLifecycleMap = {
  started: createActionCreator('SystemStateInitialize:Started'),
  serverAction: createActionCreator('ServerReq:SystemStateInitialize:ServerAction'),
  // 'ServerResp:...' actions are handled by redux-cablecar, so this executor is never invoked,
  // it only exists to allow deox to automatically declare types. See README.
  complete: createActionCreator(
    'ServerResp:SystemStateInitialize:Complete',
    resolve => (payload: SystemState) => resolve(payload)
  ),
  serverError: createActionCreator('ServerResp:SystemStateInitialize:ServerError',
    resolve => {
      return (action) => {
        return resolve(action)
      }
    }
  )
}
