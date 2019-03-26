import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import Login from '../login'
import { ROOT_IMG } from '../../modules/config'

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
        <Login />
        <div className='actionbar_slider'>
         <div className='brand'>
          <img src={`${ROOT_IMG}/logo.png`} alt="logo"/>
        </div>  
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actionbar)