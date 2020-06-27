import fetchAPI from './'

export const getPosts = async (tag) => {
    let url = 'posts/'
    if (tag) {
        url += '?tag=' + tag
    }
    return await fetchAPI(url)
}

export const getTags = async () => {
    return await fetchAPI('tags/')
}

export const createPost = async (payload) => {
    return await fetchAPI('post/', 'POST', payload, true)
}
