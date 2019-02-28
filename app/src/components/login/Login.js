import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { login, logout } from '../../modules/config'

const mapStateToProps = (state, ownProps) => {
  return ({
    cnf: state.config.login
  })
}

const mapDispatchToProps = {
  login,
  logout
}

export class Login extends React.Component {
  static propTypes = {
    cnf: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      login: false,
      name: '',
      password: ''
    }
  }

  static getDerivedStateFromProps(props, state) {    
    let tokenLocal = localStorage.getItem('token')
    if ((props.cnf.token === null || props.cnf.token === undefined) && tokenLocal === null) return null
    if (tokenLocal === null) { localStorage.setItem('token', props.cnf.token) }
    return { login: true }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  handleName = (e) => {
    this.setState({ name: e.target.value })
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  handleSubmit = (e)  => {
    this.props.login(this.state.name, this.state.password)
    e.preventDefault()
  }

  render() {
    return (
      <div>
        { (this.state.login === true)
        ? <form onSubmit={this.props.logout}>
            <input type="submit" value="Logout" />
          </form>

        : <form onSubmit={this.handleSubmit}>
            <label>Name: </label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleName}
            />
            
            <label>Password: </label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            
            <input type="submit" value="Login" />
        </form>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)