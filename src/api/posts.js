import fetchAPI from './'

export const getPosts = async (tag) => {
    let url = 'post/list/'
    if (tag) {
        url += '?tag=' + tag
    }
    return await fetchAPI(url)
}

export const getMyPosts = async () => {
    let url = 'post/list/mine/'
    return await fetchAPI(url)
}

export const getTags = async () => {
    return await fetchAPI('post/tags/')
}

export const createPost = async (payload) => {
    return await fetchAPI('post/create/', 'POST', payload, true)
}
