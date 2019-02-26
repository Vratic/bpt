import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createStore from './store/createStore'

const MOUNT_NODE = document.getElementById('root')
const store = createStore()

ReactDOM.render(
  <App store={store}/>,
  MOUNT_NODE
)

module.hot.accept()