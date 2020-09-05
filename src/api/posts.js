import fetchAPI from './'

export const getPosts = async (tag, page = 1, action) => {
    let url = `post/list/?page=${page}`
    if (tag) url += '&tag=' + tag
    if (action) url += '&action=' + action
    return await fetchAPI(url)
}

export const getMyPosts = async (page = 1) => {
    let url = `post/list/mine/?page=${page}`
    return await fetchAPI(url)
}

export const getMyLikedPosts = async (page = 1) => {
    let url = `post/list/liked/?page=${page}`
    return await fetchAPI(url)
}

export const getTags = async (settings) => {
    let url = 'post/tags/'
    if (settings.order_by_interest && settings.order_by_random) {
        url += '?order_by_interest=true&order_by_random=true'
    } else if (settings.order_by_interest) {
        url += '?order_by_interest=true'
    } else if (settings.order_by_random) {
        url += '?order_by_random=true'
    }
    return await fetchAPI(url)
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

export const getSimilarPosts = async (id, page = 1) => {
    return await fetchAPI(`post/${id}/similar/?page=${page}`)
}

export const getPostsByUserID = async (id, page = 1) => {
    let url = `post/list/user/${id}/?page=${page}`
    return await fetchAPI(url)
}
