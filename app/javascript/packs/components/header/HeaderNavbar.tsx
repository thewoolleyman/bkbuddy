import {Alignment, AnchorButton, Classes, Navbar, NavbarGroup, NavbarHeading} from '@blueprintjs/core'
import * as React from 'react'
import {connect} from 'react-redux'
import {RootState, SystemState,} from '~/store'
import Errors from './Errors'

export type HeaderNavbarStateProps = {
  system: SystemState,
}
export type HeaderNavbarProps = HeaderNavbarStateProps

function HeaderNavbar(props: HeaderNavbarProps) {
  return (
    <Navbar id='header' className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>{props.system.userName}</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.CENTER}>
        <Errors/>
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
  )
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
})

export default connect<HeaderNavbarStateProps,
  {},
  {},
  RootState>(
  mapStateToProps,
  {},
)(HeaderNavbar)
