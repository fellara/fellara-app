import {getTags} from '../api/posts'

export const getInitals = () => async (dispatch, getState) => {
    const tagsSettings = getState().settings.tags
    const tags = await getTags(tagsSettings);
    dispatch({type: 'GOT_TAGS', tags: tags.data})
    if (tags.length > 0) return true
}

export const makeAlert = (text, type) => {
  return { type: 'ADD_TO_ALERTS', text, alertType: type }
}
