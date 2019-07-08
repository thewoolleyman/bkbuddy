import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'
import {ActionLifecycleMap} from '~/store'

function monitoredPipelineDeleteThunk(slug: string) {
  return (dispatch: Dispatch) => {
    dispatch(MonitoredPipelineDelete.started())
    dispatch(MonitoredPipelineDelete.serverAction(slug))
  }
}

export const MonitoredPipelineDelete: ActionLifecycleMap = {
  started: createActionCreator('MonitoredPipelineDelete:Started'),
  clientAction: monitoredPipelineDeleteThunk,
  serverAction: createActionCreator(
    'ServerReq:MonitoredPipelineDelete:ServerAction',
    resolve => (slug: string) => resolve({slug}),
  ),
  // 'ServerResp:...' actions are handled by redux-cablecar, so this executor is never invoked,
  // it only exists to allow deox to automatically declare types. See README.
  complete: createActionCreator(
    'ServerResp:MonitoredPipelineDelete:Complete',
    resolve => (payload: { slug: string }) => resolve(payload)
  ),
  serverError: createActionCreator('ServerResp:MonitoredPipelineDelete:ServerError', resolve => error =>
    resolve(error)
  ),
}

