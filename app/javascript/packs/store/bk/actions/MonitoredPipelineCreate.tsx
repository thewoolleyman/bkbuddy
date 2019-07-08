import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'
import {ActionLifecycleMap, Pipeline} from '~/store'

function monitoredPipelineCreateThunk(slug: string, name: string) {
  return (dispatch: Dispatch) => {
    dispatch(MonitoredPipelineCreate.started())
    dispatch(MonitoredPipelineCreate.serverAction(slug, name))
  }
}

export const MonitoredPipelineCreate: ActionLifecycleMap = {
  started: createActionCreator('MonitoredPipelineCreate:Started'),
  clientAction: monitoredPipelineCreateThunk,
  serverAction: createActionCreator(
    'ServerReq:MonitoredPipelineCreate:ServerAction',
    resolve => (slug: string, name: string) => resolve({slug, name}),
  ),
  // 'ServerResp:...' actions are handled by redux-cablecar, so this executor is never invoked,
  // it only exists to allow deox to automatically declare types. See README.
  complete: createActionCreator(
    'ServerResp:MonitoredPipelineCreate:Complete',
    resolve => (payload: { pipeline: Pipeline }) => resolve(payload)
  ),
  serverError: createActionCreator('ServerResp:MonitoredPipelineCreate:ServerError', resolve => error =>
    resolve(error)
  )
}

