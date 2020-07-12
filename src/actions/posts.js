export const setActiveTag = (activeTag) => (dispatch) => {
    dispatch({type: 'SET_ACTIVE_TAG', activeTag})
} 

export const setUploadProgress = (uploadProgress) => (dispatch) => {
    dispatch({type: 'SET_UPLOAD_PROGRESS', uploadProgress})
} 
