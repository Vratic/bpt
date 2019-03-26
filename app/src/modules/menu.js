export const CREATE_LIST = 'CREATE_LIST'


export const createList = (name) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_LIST,
      payload: name
    })
  }
}

const ACTION_HANDLERS = {
  [CREATE_LIST]: (state, action) => action.payload
}

const initialState = {
  meal: []
}

export const menuReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  let meal = Object.assign({}, state.meal)

  switch (action.type) {
    case CREATE_LIST:
      let name = handler(state, action)
      meal[name] = []
      return Object.assign({}, state, { meal })
  }
  return state
}

export default menuReducer