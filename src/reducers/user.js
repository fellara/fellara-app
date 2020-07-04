const initialState = {
  isLoggedIn: false,
}
export const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_IS_LOGGED_IN':
      return {...state, isLoggedIn: true}
    case 'GOT_PROFILE_INFO':
      return {...state, ...action.profile}
    case 'USER_LOGGED_OUT':
      return initialState
    default:
      return state
  }
}

export const token = (state = null, action) => {
  switch (action.type) {
    case 'GOT_TOKEN':
      return action.token
    case 'USER_LOGGED_OUT':
      return null
    default:
      return state
  }
}