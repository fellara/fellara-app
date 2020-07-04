
export const setToken = (token) => (dispatch) => {
    dispatch({type: 'GOT_TOKEN', token})
} 

export const setProfile = (profile) => (dispatch) => {
    dispatch({type: 'USER_IS_LOGGED_IN'})
    dispatch({type: 'GOT_PROFILE_INFO', profile})
} 

export const logoutUser = () => (dispatch) => {
    dispatch({type: 'USER_LOGGED_OUT'})
}