import { combineReducers } from 'redux'

import {user, token} from './user'
import {updates} from './updates'
import {posts} from './posts'

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

const alerts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_ALERTS':
      return [
        {
          text: action.text,
          type: action.alertType
        },
        ...state
      ]
    default:
      return state
  }
}

export default combineReducers({
  initials,
  loading,
  posts,
  token,
  updates,
  user,
})
