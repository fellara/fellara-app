
export const posts = (state = {
  activeTag: null,
  uploadProgress: 0,
}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAG':
      return {...state, activeTag: action.activeTag}
    case 'SET_UPLOAD_PROGRESS':
      return {...state, uploadProgress: action.uploadProgress}
    default:
      return state
  }
}