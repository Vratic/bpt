
import { combineReducers } from 'redux'
import configReducer from '../modules/config'
import menuReducer from '../modules/menu'

export const rootReducers = () => {
  return combineReducers({
    config: configReducer,
    menu: menuReducer
  })
}

export default rootReducers