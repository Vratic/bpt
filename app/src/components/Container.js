import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { login } from '../modules/config'
import request from 'superagent'

const mapStateToProps = (state, ownProps) => {
  return ({
  })
}

const mapDispatchToProps = {
  login
}

export class Container extends React.Component {
  static propTypes = {
    login: PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }


  componentDidMount() {
    this.props.login()

    let body = {
      req: 'login',
      username: 'admin',
      password: 'admin'
    }

    return new Promise((resolve) => {
      let res = request.post('http://localhost/api/user.php')
      .send(body)
      .set('Accept', 'application/json')
      .end((err, res) => {
        resolve({ err, response: res })
      })

    }).then((res) => {
      console.log('[ REQ ]', res.response.body)
    })
  }

  render() {
    return (
      <div><h1>Bistro Pod Troskami</h1></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)