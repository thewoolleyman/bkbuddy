import * as React from 'react'
import {connect} from 'react-redux'
import {BkState, RootState, SystemState, UiState,} from '../store'
import PipelineChooser from './PipelineChooser'
import {Alignment, AnchorButton, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from '@blueprintjs/core'

import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import './app.css'

export type AppStateProps = {
  bk: BkState,
  system: SystemState,
  ui: UiState,
}
export type AppProps = AppStateProps

function App(props: AppProps) {
  return (
    <div>
      <Navbar id='navbar' className={Classes.DARK}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>{props.system.userName}</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <AnchorButton
            href={props.system.logoutLink}
            text="Sign Out"
            target="_blank"
            minimal
            rightIcon="log-out"
          />
        </NavbarGroup>
      </Navbar>
      <PipelineChooser/>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  bk: state.bk,
  system: state.system,
  ui: state.ui,
})

export default connect<AppStateProps,
  {},
  {},
  RootState>(
  mapStateToProps,
  {},
)(App)
