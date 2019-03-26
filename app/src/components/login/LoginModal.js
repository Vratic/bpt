import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { ROOT_IMG, showLoginModal, login } from '../../modules/config'

const mapStateToProps = (state, ownProps) => {
  return ({
    show: state.config.showModal
  })
}

const mapDispatchToProps = {
  showLoginModal,
  login
}

export class LoginModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    showLoginModal: PropTypes.func,
    login: PropTypes.func
  }

  constructor() {
    super()

    this.state = {
      username: '',
      password: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  hideLoginModal = () => {
    this.props.showLoginModal(false)
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  login = (e) => {
    this.props.login(this.state.username, this.state.password).then(() => {
      this.hideLoginModal()
    })
    e.preventDefault()
  }

  render() {
    return (
      (this.props.show)
      ? <div id='id01' className='modal'>
        <form className='modal-content animate'>
          
          <span className='close' onClick={() => this.hideLoginModal()}>&times;</span>
          
          <div className="imgcontainer">
            <img src={`${ROOT_IMG}/login.png`} alt="Avatar" className="avatar" /> 
          </div>

          <div className="container">
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" onChange={this.handleUsername} required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" onChange={this.handlePassword} required />
              
            <button className='modal_button'type="submit" onClick={this.login}>Login</button>
          </div>

        </form>
      </div>
      : ''
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)