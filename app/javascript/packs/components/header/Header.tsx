import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '~/store'
import HeaderNavbar from './HeaderNavbar'

function Header() {
  return (
    <div>
      <HeaderNavbar/>
    </div>
  )
}

// noinspection JSUnusedLocalSymbols
const mapStateToProps = (_: RootState) => ({})

export default connect<{},
  {},
  {},
  RootState>(
  mapStateToProps,
  {},
)(Header)
