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
    'SERVER_MONITORED_PIPELINE_DELETE',
    resolve => (slug: string) => resolve({slug}),
  ),
  complete: createActionCreator(
    'MONITORED_PIPELINE_DELETE_COMPLETE',
    resolve => (payload: { slug: string }) => resolve(payload)
  ),
  error: createActionCreator('MONITORED_PIPELINE_DELETE_ERROR', resolve => error =>
    resolve(error)
  ),
})

