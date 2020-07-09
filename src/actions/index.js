import {getTags} from '../api/posts'

export const getInitals = () => async (dispatch) => {
    const tags = await getTags();
    dispatch({type: 'GOT_TAGS', tags: tags.data})
    if (tags.length > 0) return true
}