
export const toasts = (state = [], action) => {
  switch (action.type) {
    case 'MAKE_TOAST':
      return [action.toast, ...state]
    default:
      return state
  }
}