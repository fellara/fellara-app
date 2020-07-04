import fetchAPI from './'

export const login = async (data) => {
    return await fetchAPI('/user/rest-auth/login/', 'Post', data)
}
