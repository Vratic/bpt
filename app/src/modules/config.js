
import { rootEndpoint } from './settings'
import request from 'superagent'

export const LOGIN_USER = 'LOGIN_USER'


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
          payload: res.response.body.status
        })  
      })
  }
}

const ACTION_HANDLERS = {
  [LOGIN_USER]: (state, action) => action.payload
}


const initialState = {
  login: {}
}

export const configReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  let login = Object.assign({}, state.login)

  switch (action.type) {
    case LOGIN_USER:
      let status = handler(state, action)
      login.status = status    
      return Object.assign({}, state, { login })  
  }

  return state  
}

export default configReducer