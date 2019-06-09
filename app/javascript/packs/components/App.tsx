import * as React from 'react'
import {connect} from 'react-redux'
import {AppState} from '../store'

import {SystemState} from '../store/system/types'
import {BkState} from '../store/bk/types'
import {pipelinesFetch} from '../store/bk/actions'

interface AppProps {
  cablecar: any
  system: SystemState
  bk: BkState
  pipelinesFetch: typeof pipelinesFetch
}

function App(props: AppProps) {
  return (
    <div>
      <h1>
        {props.system.userName} -{props.system.bkApiToken}
      </h1>
      <div>
        <button onClick={() => props.pipelinesFetch()}>Read pipelines from Buildkite</button>
        <ul>
          {
            props.bk.pipelines.map((pipeline) =>
              <li key={pipeline.uuid}>{pipeline.uuid} - {pipeline.name}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  bk: state.bk,
})

export default connect(
  mapStateToProps,
  {pipelinesFetch}
)(App)
