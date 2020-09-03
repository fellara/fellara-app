
export const settings = (state = {
    installPrompt: true,
}, action) => {
    switch (action.type) {
      case 'TURN_OFF_INSTALL_PROMPT':
        return {...state, installPrompt: false}
      default:
        return state
    }
  }