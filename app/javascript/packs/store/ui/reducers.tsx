import {createReducer} from 'deox'
import {ClearErrors} from '~/store/ui/actions/ClearErrors'
import {TestErrorsForce} from '.'
import {AllPipelinesFetch, SystemStateInitialize} from '..'
import {defaultState} from './state'

const allPipelinesFetchLoadingReducers = (handleAction) => ([
  // actions for displaying loading state for AllPipelinesFetch
  handleAction(AllPipelinesFetch.started, state => ({
    ...state,
    fetchingAllPipelines: true
  })),
  handleAction([AllPipelinesFetch.complete, AllPipelinesFetch.clientError], state => ({
    ...state,
    fetchingAllPipelines: false
  })),
])

const errorDisplayReducers = (handleAction) => ([
  // Action to clear errors after they are displayed
  handleAction(ClearErrors.clientAction, state => ({
    ...state,
    errors: []
  })),

  // actions for system testing of error handling
  handleAction(TestErrorsForce.clientAction, state => ({
    ...state,
    errors: [...state.errors,
      // client error tests handling of multiple errors
      {
        name: 'TestClientError1',
        message: 'Forced client error 1 for use in system integration testing',
        stack: 'stack1...'
      },
      {
        name: 'TestClientError2',
        message: 'Forced client error 2 for use in system integration testing',
        stack: 'stack2...'
      },
    ]
  })),
  handleAction(TestErrorsForce.serverError, (state, action: any) => ({
    ...state,
    errors: [...state.errors, action.error]
  })),
])

const errorHandlingReducers = (handleAction) => ([
  // actions for handling of various different errors
  // TODO: why did handler parameter have to be typed to any?
  handleAction(SystemStateInitialize.serverError, (state, action: any) => ({
    ...state,
    errors: [...state.errors, action.error]
  })),
])

export const uiReducer = createReducer(
  defaultState,
  handleAction => [
    ...allPipelinesFetchLoadingReducers(handleAction),
    ...errorHandlingReducers(handleAction),
    ...errorDisplayReducers(handleAction),
  ]
)
