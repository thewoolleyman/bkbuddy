import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'
import {Pipeline} from '~/store'

function _monitoredPipelineCreateThunk(slug: string, name: string) {
  return (dispatch: Dispatch) => {
    dispatch(monitoredPipelineCreate.next())
    try {
      dispatch(monitoredPipelineCreate.server_action(slug, name))
    } catch (error) {
      dispatch(monitoredPipelineCreate.error(error))
    }
  }
}

export const monitoredPipelineCreate = Object.assign(_monitoredPipelineCreateThunk, {
  next: createActionCreator('MONITORED_PIPELINE_CREATE_NEXT'),
  server_action: createActionCreator(
    'SERVER_MONITORED_PIPELINE_CREATE',
    resolve => (slug: string, name: string) => resolve({slug, name}),
  ),
  complete: createActionCreator(
    'MONITORED_PIPELINE_CREATE_COMPLETE',
    resolve => (payload: { pipeline: Pipeline }) => resolve(payload)
  ),
  error: createActionCreator('MONITORED_PIPELINE_CREATE_ERROR', resolve => error =>
    resolve(error)
  ),
})

