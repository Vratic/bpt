
export const LOGIN_USER = 'LOGIN_USER'


export const login = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload: { name: 'admin', pass: 'blabla' }
    })   
  }
}

const ACTION_HANDLERS = {
  [LOGIN_USER]: (state, action) => action.payload
}


const initialState = {
  user: {}
}

export const configReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  switch (action.type) {
    case LOGIN_USER:
      let user = handler(state, action)
      return Object.assign({}, state, { user })  
  }

  return state  
}

export default configReducer