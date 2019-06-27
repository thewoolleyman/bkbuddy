import * as React from 'react'
import {connect} from 'react-redux'
import Header from './header/Header'
import PipelineChooser from './pipeline-chooser/PipelineChooser'
import MonitoredPipelines from './monitored-pipelines/MonitoredPipelines'

import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import './app.css'

function App() {
  return (
    <div>
      <Header/>
      <PipelineChooser/>
      <MonitoredPipelines/>
    </div>
  )
}

export default connect()(App)
