import { createStore, combineReducers, applyMiddleware, compose, } from 'redux'
import rootReducers from './reducers'
import thunk from 'redux-thunk'

const __DEV__ = process.env.NODE_ENV === 'development'

export default () => {
  const middleware = [thunk]
  let composeEnhancers = compose
  const enhancers = []
  const initialState = {}

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }


  const store = createStore(
    rootReducers(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  
  return store
}