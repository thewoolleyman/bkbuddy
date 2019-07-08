import {ActionCreator, AnyAction} from 'deox'
import {combineReducers} from 'redux'
import {bkReducer as bk} from './bk'
import {systemReducer as system} from './system'
import {uiReducer as ui} from './ui'


// This COULD validate the allowed string patterns.  See https://medium.com/@dhruvrajvanshi/advanced-typescript-patterns-6cf8826c7944
// Could also validate clientAction to be a thunk
// Maybe validate that if there is a client/server action, there must also be client/server error?
export type ActionLifecycleMap = {
  started: ActionCreator<AnyAction>
  clientAction?: any
  serverAction?: ActionCreator<AnyAction>
  complete: ActionCreator<any>
  clientError?: any
  serverError?: any
}


export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  system,
  bk,
  ui,
})
