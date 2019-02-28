import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import Login from '../login'
import logo from '../../css/img/logo.png'

const mapStateToProps = (state, ownProps) => {
  return ({

  })
}

const mapDispatchToProps = {

}

export class Actionbar extends React.Component {
  static propTypes = {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    return (
      <div className='actionbar'>
          <img src={logo} className='logo' style={{height: '80%', padding: '10px'}}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actionbar)