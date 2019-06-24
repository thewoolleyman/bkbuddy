import * as React from 'react'
import {connect} from 'react-redux'
import {
  BkState,
  pipelinesFetchAll,
  RootState,
  SystemState,
  UiState,
} from '../store'
import {bindActionCreators} from 'redux'

export type AppStateProps = {
  bk: BkState,
  system: SystemState,
  ui: UiState,
}
export type AppDispatchProps = ReturnType<typeof mapDispatchToProps>

export type AppProps = AppStateProps & AppDispatchProps

function App(props: AppProps) {
  return (
    <div>
      <h1>
        {props.system.userName} -{props.system.bkApiToken}
      </h1>
      <div>
        <button id='pipelines-fetch-all' onClick={props.pipelinesFetchAll} disabled={props.ui.fetchingAllPipelines}>
          {props.ui.fetchingAllPipelines ? 'fetching...' : 'Read pipelines from Buildkite'}
        </button>
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

const mapStateToProps = (state: RootState) => ({
  bk: state.bk,
  system: state.system,
  ui: state.ui,
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      pipelinesFetchAll,
    },
    dispatch
  )
}

export default connect<AppStateProps,
  AppDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(App)
