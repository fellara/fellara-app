import jsCookie from 'js-cookie'

export const setToken = (token) => (dispatch) => {
    jsCookie.set('TOKEN', token)
    dispatch({type: 'GOT_TOKEN', token})
} 

export const setProfile = (profile) => (dispatch) => {
    dispatch({type: 'USER_IS_LOGGED_IN'})
    dispatch({type: 'GOT_PROFILE_INFO', profile})
} 

export const logoutUser = () => (dispatch) => {
    dispatch({type: 'USER_LOGGED_OUT'})
}