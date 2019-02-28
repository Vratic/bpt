import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import Login from './login'


const mapStateToProps = (state, ownProps) => {
  return ({
  })
}

const mapDispatchToProps = {
}

export class Container extends React.Component {
  static propTypes = {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    return (
      <div>
        <h1>Bistro Pod Troskami</h1>
        <Login />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)