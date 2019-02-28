import React from 'react'
import deepEqual from 'deep-equal'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Container from './components/Container'
import './css/intro.js'

export class App extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Container />
      </Provider>
    )
  }
}

export default App