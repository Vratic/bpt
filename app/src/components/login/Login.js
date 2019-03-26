import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { logout, showLoginModal } from '../../modules/config'
import LoginModal from './LoginModal'

const mapStateToProps = (state, ownProps) => {
  return ({
    token: state.config.token,
    username: state.config.username
  })
}

const mapDispatchToProps = {
  logout,
  showLoginModal
}

export class Login extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    username: PropTypes.string,
    logout: PropTypes.func,
    showLoginModal: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      login: false
    }
  }

  static getDerivedStateFromProps(props, state) {    
    let tokenLocal = localStorage.getItem('token')
    if (props.token === null  && tokenLocal === null) return {login: false}
    
    if (tokenLocal === null) {
      localStorage.setItem('token', props.token)
    } else {

    }

    return { login: true }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  showLoginModal = (show) => {
    this.props.showLoginModal(show)
  }

  logout = () => {
    this.setState({
      login: false
    }, () => {
      this.props.logout()
    })
  }

  render() {
    return (
      <div className='login' >
        {(!this.state.login) 
          // ? <i className="fas fa-sign-in-alt" onClick={() => this.showLoginModal(true)} />    
          ? <span  onClick={() => this.showLoginModal(true)}>login</span>      
          : <span onClick={() => this.logout()}>{this.props.username || ''}<i className="fas fa-sign-out-alt" onClick={() => this.logout()}/></span>
        }
        <LoginModal />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)