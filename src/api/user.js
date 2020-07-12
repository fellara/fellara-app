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
    return await fetchAPI('user/rest-auth/user/', 'PATCH', data, true)
}

export const getCountries = async (query = '') => {
    return await fetchAPI(`places/?search=${query}`)
}

export const getCities = async (query = '', country) => {
    let url = `places/cities/?search=${query}`
    if (country) url += `&country=${country}`
    return await fetchAPI(url)
}
