import { combineReducers } from 'redux'


export const loading = (state=false, action) => {
  switch (action.type) {
    case 'LOADIN_ON':
      return true
    default:
      return state
  }
}




export default combineReducers({
  loading
})