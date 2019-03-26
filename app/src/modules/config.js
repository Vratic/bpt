
export const ROOT_URL = 'http://localhost'
export const ROOT_IMG = `${ROOT_URL}/cdn/`
// --------------------------------------------------
import request from 'superagent'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL'

export const login = (usr, psw) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      let body = { req: 'login', username: usr, password: psw }
      request.post(`${ROOT_URL}/api/user.php`)
        .send(body)
        .set('Accept', 'application/json')
        .end((err, res) => {
          resolve({ err, response: res })
        })
      }).then((res) => {
        localStorage.setItem('username', usr)
        dispatch({
          type: LOGIN_USER,
          payload: res.response.body.token,
          username: usr
        })  
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      let body = { req : 'logout' }
      request.post(`${ROOT_URL}/api/user.php`)
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
 
export const showLoginModal = (show) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOGIN_MODAL,
      payload: show
    })
  }
}

const ACTION_HANDLERS = {
  [LOGIN_USER]: (state, action) => action.payload,
  [LOGOUT_USER]: (state, action) => action.payload,
  [SHOW_LOGIN_MODAL]: (state, action) => action.payload
}


const initialState = {
  showModal: false,
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username')
}

export const configReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  switch (action.type) {
    case LOGIN_USER:
      let token = handler(state, action)
      let username = action.username
      return Object.assign({}, state, { token, username })

    case LOGOUT_USER:
      let reqOut = handler(state, action)
      token = null
      return Object.assign({}, state, { token })

    case SHOW_LOGIN_MODAL:
      let showModal = handler(state, action)
      return Object.assign({}, state, { showModal })
  }

  return state  
}

export default configReducer