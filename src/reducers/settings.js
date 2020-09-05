
export const settings = (state = {
    installPrompt: true,
    tags: {
      order_by_interest: true,
      order_by_random: true,
    }
}, action) => {
    switch (action.type) {
      case 'TURN_OFF_INSTALL_PROMPT':
        return {...state, installPrompt: false}
      case 'CHANGE_TAG_SETTINGS':
        return {...state, tags: {...state.tags, ...action.payload}}
      default:
        return state
    }
  }