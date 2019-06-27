import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

function _monitoredPipelineDeleteThunk(uuid: string) {
  return (dispatch: Dispatch) => {
    dispatch(monitoredPipelineDelete.next())
    try {
      dispatch(monitoredPipelineDelete.server_action(uuid))
    } catch (error) {
      dispatch(monitoredPipelineDelete.error(error))
    }
  }
}

export const monitoredPipelineDelete = Object.assign(_monitoredPipelineDeleteThunk, {
  next: createActionCreator('MONITORED_PIPELINE_DELETE_NEXT'),
  server_action: createActionCreator(
    'SERVER_MONITORED_PIPELINE_DELETE',
    resolve => (uuid: string) => resolve({uuid}),
  ),
  complete: createActionCreator(
    'MONITORED_PIPELINE_DELETE_COMPLETE',
    resolve => (payload: { uuid: string }) => resolve(payload)
  ),
  error: createActionCreator('MONITORED_PIPELINE_DELETE_ERROR', resolve => error =>
    resolve(error)
  ),
})

