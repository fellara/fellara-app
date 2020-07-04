import { combineReducers } from 'redux'

import {user, token} from './user'

export const loading = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_ON':
      return true
    default:
      return state
  }
}

export default combineReducers({
  loading,
  user,
  token,
})
