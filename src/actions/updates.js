
export const forceProfileUpdate = () => (dispatch) => {
    dispatch({type: 'PROFILE_NEED_UPDATE', state: true})
} 

export const forceProfileUpdateDone = () => (dispatch) => {
    dispatch({type: 'PROFILE_NEED_UPDATE', state: false})
} 

export const forceTagUpdate = (tag) => (dispatch) => {
    dispatch({type: 'TAG_NEED_UPDATE', tag})
} 

export const forceTagUpdateDone = () => (dispatch) => {
    dispatch({type: 'TAG_NEED_UPDATE', tag: null})
} 
