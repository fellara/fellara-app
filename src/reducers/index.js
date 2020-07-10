import { combineReducers } from 'redux'

import {user, token} from './user'
import {updates} from './updates'

export const initials = (state = {
  tags: []
}, action) => {
  switch (action.type) {
    case 'GOT_TAGS':
      return {...state, tags: action.tags}
    default:
      return state
  }
}

export const loading = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_ON':
      return true
    default:
      return state
  }
}

export default combineReducers({
  initials,
  loading,
  token,
  updates,
  user,
})
