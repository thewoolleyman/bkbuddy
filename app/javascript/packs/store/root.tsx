import {combineReducers} from 'redux'
import {bkReducer as bk} from './bk'

import {systemReducer as system} from './system'
import {uiReducer as ui} from './ui'


export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  system,
  bk,
  ui,
})
