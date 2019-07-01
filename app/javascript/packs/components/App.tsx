import {Classes} from '@blueprintjs/core'

import 'normalize.css'
import * as React from 'react'
import FetchEmojis from '~/components/FetchEmojis'
import './app.scss'
import Header from './header/Header'
import MonitoredPipelines from './monitored-pipelines/MonitoredPipelines'
import PipelineChooser from './pipeline-chooser/PipelineChooser'

export function App() {
  // RUNNING_TEXT must be nested within DARK for theme to work
  return (
    <div className={Classes.DARK}>
      <div className={Classes.RUNNING_TEXT}>
        <FetchEmojis/>
        <Header/>
        <PipelineChooser/>
        <MonitoredPipelines/>
      </div>
    </div>
  )
}
