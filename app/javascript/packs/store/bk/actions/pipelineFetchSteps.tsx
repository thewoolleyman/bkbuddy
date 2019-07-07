import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

import {getPipelineSteps} from '~/api'
import {RootState, Step} from '~/store'

function _pipelineFetchStepsThunk(pipelineSlug: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(pipelineFetchSteps.next())

    try {
      const steps = await getPipelineSteps(getState().system.bkApiToken, pipelineSlug)
      dispatch(pipelineFetchSteps.server_action(steps))
    } catch (error) {
      dispatch(pipelineFetchSteps.error(error))
    }
  }
}

export const pipelineFetchSteps = Object.assign(_pipelineFetchStepsThunk, {
  next: createActionCreator('PIPELINE_FETCH_STEPS_NEXT'),
  server_action: createActionCreator(
    'SERVER_REQ_PIPELINE_FETCH_STEPS',
    resolve => (steps: Step[]) => resolve(steps)
  ),
  // SERVER_RESP actions are handled by redux-cablecar, so this executor is never invoked,
  // it only exists to allow deox to automatically declare types. See README.
  complete: createActionCreator(
    'SERVER_RESP_PIPELINE_FETCH_STEPS_COMPLETE',
    resolve => (payload: { steps: Step[] }) => resolve(payload)
  ),
  error: createActionCreator('PIPELINE_FETCH_STEPS_ERROR', resolve => error =>
    resolve(error)
  ),
})

