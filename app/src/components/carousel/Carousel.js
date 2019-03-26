import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { ROOT_IMG } from '../../modules/config'

const mapStateToProps = (state, ownProps) => {
  return ({

  })
}

const mapDispatchToProps = {

}

export class CarouselContainer extends React.Component {
  static propTypes = {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    return (
      <div className='carousel'>
        <Carousel
          infiniteLoop={true}
          interval={20000}
          showArrows={false}
          showThumbs={false}
          thumbWidth={2000}
          autoPlay={true}
          transitionTime={1000}
        >
            <div>
                <img src={`${ROOT_IMG}/carousel/1.jpg`} />
                <p className="legend"></p>
            </div>
            <div>
                <img src={`${ROOT_IMG}/carousel/1.jpg`} />
                <p className="legend"></p>
            </div>
        </Carousel>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselContainer)