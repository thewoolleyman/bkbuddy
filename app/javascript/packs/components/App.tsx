import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import 'normalize.css'
import * as React from 'react'
import './app.css'
import Header from './header/Header'
import MonitoredPipelines from './monitored-pipelines/MonitoredPipelines'
import PipelineChooser from './pipeline-chooser/PipelineChooser'

export function App() {
  return (
    <div>
      <Header/>
      <PipelineChooser/>
      <MonitoredPipelines/>
    </div>
  )
}
