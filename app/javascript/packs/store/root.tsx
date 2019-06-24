import {combineReducers} from 'redux'

import {systemReducer as system} from './system/reducers'
import {bkReducer as bk} from './bk/reducers'
import {uiReducer as ui} from './ui/reducers'


export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  system,
  bk,
  ui,
})
