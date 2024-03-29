import {applyMiddleware, createStore} from 'redux'
import cablecar from 'redux-cablecar'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {rootReducer} from './root'
import {SystemStateInitialize} from './system'

export function configureStore() {
  const middlewares = [thunk, cablecar]
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  )

  // Connect cablecar to the store
  cablecar.connect(store, 'MainChannel', {
    prefix: 'ServerReq', // prefix for messages which cablecar will send to server
    connected: function () {
      // connected callback, sends message to server to get system state
      store.dispatch({type: SystemStateInitialize.serverAction.type})
    }
  })

  return store
}
