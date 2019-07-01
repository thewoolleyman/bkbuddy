import * as React from 'react'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {emojisFetch, RootState, SystemState} from '~/store'

type AppInitStateProps = {
  system: SystemState,
}

type AppInitDispatchProps = ReturnType<typeof mapDispatchToProps>

type AppInitProps = AppInitStateProps & AppInitDispatchProps

function AppInit(props: AppInitProps) {
  useEffect(() => {
      if (props.system.bkApiToken) {
        props.emojisFetch()
      }
    },
    [props.system.bkApiToken]);
  return (<div/>)
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      emojisFetch,
    },
    dispatch
  )
}

export default connect<AppInitStateProps,
  AppInitDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(AppInit)
