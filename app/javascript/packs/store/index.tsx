import {applyMiddleware, combineReducers, createStore} from 'redux'
import cablecar from 'redux-cablecar'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {systemReducer} from './system/reducers'
import {bkReducer} from './bk/reducers'
import {SERVER_UPDATE_SYSTEM_STATE, SystemState} from './system/types'
import {BkState} from './bk/types'

export interface AppState {
  system: SystemState
  bk: BkState
}

const rootReducer = combineReducers<AppState>({
  system: systemReducer,
  bk: bkReducer,
})

export default function configureStore() {

  const middlewares = [thunk, cablecar]
  const middleWareEnhancer = applyMiddleware(...middlewares)


  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  )

  // Connect cablecar to the store
  const car = cablecar.connect(store, 'MainChannel', {
    prefix: 'SERVER', // prefix for messages which cablecar will send to server
    connected: function () {
      store.dispatch({type: SERVER_UPDATE_SYSTEM_STATE})
    } // connected callback
  })

  return [store, car]
}
