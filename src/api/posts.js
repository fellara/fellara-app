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

export const likePost = async (id) => {
    return await fetchAPI(`post/${id}/like/`, 'POST')
}

export const getPost = async (id) => {
    return await fetchAPI(`post/${id}/`, 'GET')
}
export const deletePost = async (id) => {
    return await fetchAPI(`post/${id}/delete/`, 'DELETE')
}

export const getPostsByUserID = async (id, page = 1) => {
    let url = `post/list/user/${id}/?page=${page}`
    return await fetchAPI(url)
}
