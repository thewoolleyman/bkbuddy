import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

import {getAllPipelines} from '~/api'
import {ActionLifecycleMap, Pipeline, RootState} from '~/store'

function allPipelinesFetchThunk() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(AllPipelinesFetch.started())

    try {
      const pipelines = await getAllPipelines(getState().system.bkApiToken)
      dispatch(AllPipelinesFetch.complete(pipelines))
    } catch (error) {
      dispatch(AllPipelinesFetch.clientError(error))
    }
  }
}

export const AllPipelinesFetch: ActionLifecycleMap = {
  started: createActionCreator('AllPipelinesFetch:Started'),
  clientAction: allPipelinesFetchThunk,
  complete: createActionCreator(
    'AllPipelinesFetch:Complete',
    resolve => (payload: Pipeline[]) => resolve(payload)
  ),
  clientError: createActionCreator('AllPipelinesFetch:ClientError', resolve => error =>
    resolve(error)
  ),
}


