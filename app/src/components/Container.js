import React from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'
import Actionbar from './actionbar'
import CarouselContainer from './carousel'
import Menu from './menu'

export class Container extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    return (
      <div className='page'>
        <Actionbar />
        <CarouselContainer />
        <Menu />
      </div>
    )
  }
}

export default connect(null, null)(Container)