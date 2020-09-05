
export const turnOffInstallPrompt = () => (dispatch) => {
    dispatch({type: 'TURN_OFF_INSTALL_PROMPT'})
} 

export const changeTagSettings = (payload) => (dispatch) => {
    dispatch({type: 'CHANGE_TAG_SETTINGS', payload})
}