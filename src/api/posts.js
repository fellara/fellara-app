import fetchAPI from './'

export const getPosts = async (tag, page = 1) => {
    let url = `post/list/?page=${page}`
    if (tag) {
        url += '&tag=' + tag
    }
    return await fetchAPI(url)
}

export const getMyPosts = async (page = 1) => {
    let url = `post/list/mine/?page=${page}`
    return await fetchAPI(url)
}

export const getTags = async () => {
    return await fetchAPI('post/tags/')
}

export const createPost = async (payload) => {
    return await fetchAPI('post/create/', 'POST', payload, true)
}
