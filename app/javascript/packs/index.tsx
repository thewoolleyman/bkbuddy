import * as React from 'react'
import {render} from 'react-dom'
import App from './components/App'

import {Provider} from 'react-redux'
import configureStore from './store'

const [store, car] = configureStore()

render(
  <Provider store={store}>
    <App cablecar={car}/>
  </Provider>,
  document.getElementById('root')
)