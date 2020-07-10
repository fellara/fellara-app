
export const updates = (state = {
    profile: false,
    tag: null
}, action) => {
    switch (action.type) {
      case 'PROFILE_NEED_UPDATE':
        return {...state, profile: action.state}
    case 'TAG_NEED_UPDATE':
        return {...state, tag: action.tag}
      default:
        return state
    }
  }