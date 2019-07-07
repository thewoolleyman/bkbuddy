import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

function _monitoredPipelineDeleteThunk(slug: string) {
  return (dispatch: Dispatch) => {
    dispatch(monitoredPipelineDelete.next())
    try {
      dispatch(monitoredPipelineDelete.server_action(slug))
    } catch (error) {
      dispatch(monitoredPipelineDelete.error(error))
    }
  }
}

export const monitoredPipelineDelete = Object.assign(_monitoredPipelineDeleteThunk, {
  next: createActionCreator('MONITORED_PIPELINE_DELETE_NEXT'),
  server_action: createActionCreator(
    'SERVER_REQ_MONITORED_PIPELINE_DELETE',
    resolve => (slug: string) => resolve({slug}),
  ),
  // SERVER_RESP actions are handled by redux-cablecar, so this executor is never invoked,
  // it only exists to allow deox to automatically declare types. See README.
  complete: createActionCreator(
    'SERVER_RESP_MONITORED_PIPELINE_DELETE_COMPLETE',
    resolve => (payload: { slug: string }) => resolve(payload)
  ),
  error: createActionCreator('MONITORED_PIPELINE_DELETE_ERROR', resolve => error =>
    resolve(error)
  ),
})

