import axios from 'axios'

import {store} from '../store'
import {api_url} from '../constants'
import {setUploadProgress} from '../actions/posts'

export const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

const fetchAPI = (url, method, data, hasFile) => new Promise((resolve, reject) => {
  let config = {
    method: method || 'GET',
    url: api_url + url,
    headers: {
      'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
    }
  }
  const token = store.getState().token
  if (token) {
    config.headers.Authorization = 'Token ' + token
  }
  if (hasFile) {
    const formData = new FormData()

    for (let key in data) {
      formData.append(key, data[key])

      config.data = formData
    }
  } else if (data) {
    config.data = data
  }

  store.dispatch(setUploadProgress(0))
  config = {
    ...config,
    cancelToken: source.token,
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      store.dispatch(setUploadProgress(percentCompleted))
    }
  }

  axios(config).then(res => {
    resolve({
      status: res.status,
      statusText: res.statusText,
      data: res.data
    })
  }).catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error);
    } else {
      resolve({
        status: error.status,
        statusText: error.statusText,
        data: error.data
      })
    }
  })
})
export default fetchAPI
