import { combineReducers } from 'redux'
import {HYDRATE} from 'next-redux-wrapper';

import {user, token} from './user'
import {updates} from './updates'
import {posts} from './posts'
import {toasts} from './toasts'

export const initials = (state = {
  tags: []
}, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload};
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
  toasts,
  token,
  updates,
  user,
})
