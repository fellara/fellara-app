import fetchAPI from '.'

export const login = async (data) => {
    return await fetchAPI('user/rest-auth/login/', 'POST', data)
}

export const register = async (data) => {
    return await fetchAPI('user/rest-auth/registration/', 'POST', data, true)
}

export const logout = async () => {
    return await fetchAPI('user/rest-auth/logout/', 'POST')
}

export const getProfile = async () => {
    return await fetchAPI('user/rest-auth/user/')
}

export const updateProfile = async (data) => {
    return await fetchAPI('user/rest-auth/user/', 'PATCH', data)
}