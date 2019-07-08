import {createReducer} from 'deox'
import {sortPipelines} from '~/util'
import {
  AllPipelinesFetch,
  BkStateInitialize,
  EmojisFetch,
  MonitoredPipelineCreate,
  MonitoredPipelineDelete,
  PipelineStepsFetch
} from './actions'
import {defaultState} from './state'

export const bkReducer = createReducer(defaultState, handleAction => [
  handleAction(BkStateInitialize.complete, (state, {payload: payload}) => ({...state, ...payload})),
  handleAction(EmojisFetch.complete, (state, {payload}) => ({...state, emojis: payload})),
  handleAction(AllPipelinesFetch.complete, (state, {payload}) => ({...state, pipelines: payload})),
  handleAction(PipelineStepsFetch.complete, (state, {payload}) => {
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
  handleAction(MonitoredPipelineCreate.complete, (state, {payload}) =>
    ({
      ...state,
      monitoredPipelines: sortPipelines([...state.monitoredPipelines, payload.pipeline])
    })),
  handleAction(MonitoredPipelineDelete.complete, (state, {payload}) =>
    ({
      ...state,
      monitoredPipelines: state.monitoredPipelines.filter((p) => p.slug !== payload.slug),
    })),
])
