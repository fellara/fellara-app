
export const musics = (state = {
  current: null,
}, action) => {
    switch (action.type) {
      case 'CHANGE_CURRENT_MUSIC':
        return {...state, current: action.payload}
      default:
        return state
    }
  }