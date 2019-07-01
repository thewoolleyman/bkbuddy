import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

import {getAllPipelines} from '~/api'
import {Pipeline, RootState} from '~/store'
import {sortPipelines} from '~/store/util'

function _pipelinesFetchAllThunk() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(pipelinesFetchAll.next())

    try {
      const pipelines = await getAllPipelines(getState().system.bkApiToken)
      dispatch(pipelinesFetchAll.complete(sortPipelines(pipelines)))
    } catch (error) {
      dispatch(pipelinesFetchAll.error(error))
    }
  }
}

export const pipelinesFetchAll = Object.assign(_pipelinesFetchAllThunk, {
  next: createActionCreator('PIPELINES_FETCH_ALL_NEXT'),
  complete: createActionCreator(
    'PIPELINES_FETCH_ALL_COMPLETE',
    resolve => (pipelines: Pipeline[]) => resolve(pipelines)
  ),
  error: createActionCreator('PIPELINES_FETCH_ALL_ERROR', resolve => error =>
    resolve(error)
  ),
})

