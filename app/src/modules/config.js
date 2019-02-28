
import { rootEndpoint } from './settings'
import request from 'superagent'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'


export const login = (usr, psw) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      let body = { req: 'login', username: usr, password: psw }
      request.post(`http://${rootEndpoint}/api/user.php`)
        .send(body)
        .set('Accept', 'application/json')
        .end((err, res) => {
          resolve({ err, response: res })
        })
      }).then((res) => {
        dispatch({
          type: LOGIN_USER,
          payload: res.response.body
        })  
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      let body = { req : 'logout' }
      request.post(`http://${rootEndpoint}/api/user.php`)
        .send(body)
        .set('Accept', 'application/json')
        .end((err, res) => {
          resolve({ err, response: res })
        })
    }).then((res) => {
      localStorage.removeItem('token')
      dispatch({
        type: LOGOUT_USER,
        payload: res.response
      })
    })
  }
}

const ACTION_HANDLERS = {
  [LOGIN_USER]: (state, action) => action.payload,
  [LOGOUT_USER]: (state, action) => action.payload
}


const initialState = {
  login: {}
}

export const configReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  let login = Object.assign({}, state.login)

  switch (action.type) {
    case LOGIN_USER:
      let req = handler(state, action)
      login.status = req.status
      login.token =  req.token
      return Object.assign({}, state, { login })

    case LOGOUT_USER:
      let reqOut = handler(state, action)
      login = {}
      return Object.assign({}, state, { login })
  }

  return state  
}

export default configReducer