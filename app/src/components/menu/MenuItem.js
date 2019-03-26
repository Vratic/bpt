import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'

const mapStateToProps = (state, ownProps) => {
  return ({
    token: state.config.token,
  })
}

const mapDispatchToProps = {

}

export class MenuItem extends React.Component {
  static propTypes = {
    item: PropTypes.string,
    token: PropTypes.string
  }

  constructor() {
    super()
    this.state = {
      login: false,
      showNewItem: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      menuName: state.menuName || props.item || null,
      login : (props.token)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  handleMenuItem = (e) => {
    this.setState({
      menuName: e.target.value
    })
  }

  showNewItem = (show) => {
    this.setState({
      showNewItem: show
    })
  }

  deleteItem = () => {
    console.log('[ DELETE ITEM ]')
    this.setState({
      menuName: null,
      showNewItem: false
    }, () => {
      this.showNewItem(false)
    })
  }

  saveItem = () => {
    console.log('[ SAVE ITEM ]')
    this.setState({
      showNewItem: false
    })
  }


  renderAddItem = () => {
    return(
      (this.state.showNewItem)
      ? <div className='add_new_item'>
          <input type='text' value={(this.state.menuName === null) ? '' : this.state.menuName} onChange={this.handleMenuItem}/>
          <i className='fas fa-times icon_delete touch' onClick={() => {this.deleteItem()}} />
          <i className='fas fa-check icon_save touch' onClick={() => {this.saveItem()}} />
        </div>
      : <div className='touch' onClick={() => {this.showNewItem(true)}}>Add New Item</div>
    )
  }

  render() {
    return (
      (this.state.login)
        ?<div className='menu_item'>
        <h2>
          {(this.state.showNewItem || this.state.menuName === null)
            ?  '' 
            : <div className='menuItemName'>{this.state.menuName} <i className='fas fa-pencil-alt icon_edit touch' onClick={() => this.showNewItem(true)}></i></div>}
        </h2>

        {this.renderAddItem()}
      </div>
      : <h1>{this.state.menuName}</h1>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)