import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { login, logout } from '../modules/config'

const mapStateToProps = (state, ownProps) => {
  return ({
    cnf: state.config.login
  })
}

const mapDispatchToProps = {
  login,
  logout
}

export class Container extends React.Component {
  static propTypes = {
    cnf: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }


  componentDidMount() {
    this.props.login('vratic', 'vrabel1224')
  }

  logout = () => {
    this.props.logout(this.props.cnf.token)
  }

  render() {
    return (
      <div>
        <h1>Bistro Pod Troskami</h1>

        <div
          onClick = {() => {
            this.logout()
          }}
          style = {{ padding : '50px', background: 'lightgray' , width: '100px', cursor: 'pointer'}}
        > logout </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)