import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

import {getPipelineSteps} from '~/api'
import {RootState, Step} from '~/store'

function pipelineFetchStepsThunk(pipelineSlug: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(PipelineStepsFetch.started())

    try {
      const steps = await getPipelineSteps(getState().system.bkApiToken, pipelineSlug)
      dispatch(PipelineStepsFetch.serverAction(steps))
    } catch (error) {
      dispatch(PipelineStepsFetch.clientError(error))
    }
  }
}

export const PipelineStepsFetch = {
  started: createActionCreator('PipelineStepsFetch:Started'),
  clientAction: pipelineFetchStepsThunk,
  serverAction: createActionCreator(
    'ServerReq:PipelineStepsFetch:ServerAction',
    resolve => (steps: Step[]) => resolve(steps)
  ),
  // 'ServerResp:...' actions are handled by redux-cablecar, so this executor is never invoked,
  // it only exists to allow deox to automatically declare types. See README.
  complete: createActionCreator(
    'ServerResp:PipelineStepsFetch:Complete',
    resolve => (payload: { steps: Step[] }) => resolve(payload)
  ),
  serverError: createActionCreator('ServerResp:PipelineStepsFetch:ServerError', resolve => error =>
    resolve(error)
  ),
  clientError: createActionCreator('PipelineStepsFetch:ClientError', resolve => error =>
    resolve(error)
  ),
}

