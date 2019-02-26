
import { combineReducers } from 'redux'
import configReducer from '../modules/config'

export const rootReducers = () => {
  return combineReducers({
    config: configReducer
  })
}

export default rootReducers