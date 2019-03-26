import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import MenuItem from './MenuItem'

const mapStateToProps = (state, ownProps) => {
  let menu = state.menu.meal
  return ({
    menu
  })
}

const mapDispatchToProps = {}

export class Menu extends React.Component {
  static propTypes = {
    menu: PropTypes.array
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    return (          
      <div className='menu'>
        <div className='subMenu'>
          <h1 className='menuLabel'>Menu</h1>
          {
            (this.props.menu.length !== 0) 
            ? this.props.menu.map((item, index) => {
              return(
                <MenuItem
                  key = {`menuitem_${index}`}
                  item = {item}
                />
              )
            })
            : <MenuItem
                key = {`menuitem_zero`}
                item = {''}
              />
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)