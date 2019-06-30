import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'
import {Pipeline} from '../state'

function _monitoredPipelineCreateThunk(uuid: string, name: string) {
  return (dispatch: Dispatch) => {
    dispatch(monitoredPipelineCreate.next())
    try {
      dispatch(monitoredPipelineCreate.server_action(uuid, name))
    } catch (error) {
      dispatch(monitoredPipelineCreate.error(error))
    }
  }
}

export const monitoredPipelineCreate = Object.assign(_monitoredPipelineCreateThunk, {
  next: createActionCreator('MONITORED_PIPELINE_CREATE_NEXT'),
  server_action: createActionCreator(
    'SERVER_MONITORED_PIPELINE_CREATE',
    resolve => (uuid: string, name: string) => resolve({uuid, name}),
  ),
  complete: createActionCreator(
    'MONITORED_PIPELINE_CREATE_COMPLETE',
    resolve => (payload: { pipeline: Pipeline }) => resolve(payload)
  ),
  error: createActionCreator('MONITORED_PIPELINE_CREATE_ERROR', resolve => error =>
    resolve(error)
  ),
})

