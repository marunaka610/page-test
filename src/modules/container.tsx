import React from 'react'
import { connect } from 'react-redux'
import App from '../app/App'
import { setBlack } from './action'

function mapStateToProps(state : any) {
  return state
}

function mapDispatchToProps(dispatch : any) {
  return {
    setBlack: () => { 
      dispatch(setBlack()) 
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(App)