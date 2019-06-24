import {applyMiddleware, createStore} from 'redux'
import cablecar from 'redux-cablecar'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from './root'
import {serverUpdateSystemState} from './system/actions'

export function configureStore() {
  const middlewares = [thunk, cablecar]
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  )

  // Connect cablecar to the store
  cablecar.connect(store, 'MainChannel', {
    prefix: 'SERVER', // prefix for messages which cablecar will send to server
    connected: function () {
      // connected callback, sends message to server to get system state
      store.dispatch({type: serverUpdateSystemState.type})
    }
  })

  return store
}
