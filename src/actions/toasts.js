export const makeToast = (text, type) => (dispatch) => {
    dispatch({type: 'MAKE_TOAST', toast: {text, type}})
} 