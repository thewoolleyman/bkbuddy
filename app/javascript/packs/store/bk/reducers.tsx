import {createReducer} from 'deox'
import {sortPipelines} from '~/store/util'
import {
  emojisFetch,
  monitoredPipelineCreate,
  monitoredPipelineDelete,
  pipelineFetchSteps,
  pipelinesFetchAll,
  serverRespSetInitialBkState
} from './actions'
import {defaultState} from './state'

export const bkReducer = createReducer(defaultState, handleAction => [
  handleAction(serverRespSetInitialBkState, (state, {payload: payload}) => ({...state, ...payload})),
  handleAction(emojisFetch.complete, (state, {payload}) => ({...state, emojis: payload})),
  handleAction(pipelinesFetchAll.complete, (state, {payload}) => ({...state, pipelines: payload})),
  handleAction(pipelineFetchSteps.complete, (state, {payload}) => {
    // inefficient nested loop but there shouldn't ever be many steps
    const stateSteps = state.steps
    const newSteps = payload.steps.filter(
      (step) => !(
        stateSteps
          .find((stateStep) => step.id === stateStep.id)
      )
    )
    return ({
      ...state,
      steps: state.steps.concat(newSteps)
    })
  }),
  handleAction(monitoredPipelineCreate.complete, (state, {payload: payload}) =>
    ({
      ...state,
      monitoredPipelines: sortPipelines([...state.monitoredPipelines, payload.pipeline])
    })),
  handleAction(monitoredPipelineDelete.complete, (state, {payload: payload}) =>
    ({
      ...state,
      monitoredPipelines: state.monitoredPipelines.filter((p) => p.slug !== payload.slug),
    })),
])
