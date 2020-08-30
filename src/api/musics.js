import fetchAPI from './'

export const getMusicByTag = async (tag) => {
    let url = `musics/${tag}/random/`
    return await fetchAPI(url)
}