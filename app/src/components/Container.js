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
      req : 'users',
      // username : 'admin',
      // password : 'admin'
    }


    return new Promise((resolve) => {
      let res = request.get('http://bistropodtroskami.cz/api/user.php?req=users')
      // .send(JSON.stringify(body))
      // .set('Access-Control-Allow-Origin : *')
      .end((err, res) => {
        resolve({ err, response: res })
      })
    }).then((res) => {
      console.log('res', res.response, res.response.body)
    })
    

    console.log(res)



    // fetch('http://localhost/api/user.php', {
    //   method: 'POST',
    //   body: JSON.stringify(body)
    // })
    // .then(response => {
    //   console.log(response)
    // })
  }

  render() {
    return (
      <div><h1>Bistro Pod Troskami</h1></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)