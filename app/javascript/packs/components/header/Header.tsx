import {Alignment, AnchorButton, Classes, Navbar, NavbarGroup, NavbarHeading} from '@blueprintjs/core'
import * as React from 'react'
import {connect} from 'react-redux'
import {RootState, SystemState,} from '~/store'

type HeaderStateProps = {
  system: SystemState,
}
type HeaderProps = HeaderStateProps

function Header(props: HeaderProps) {
  return (
    <Navbar id='header' className={Classes.DARK}>
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
  )
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
})

export default connect<HeaderStateProps,
  {},
  {},
  RootState>(
  mapStateToProps,
  {},
)(Header)
