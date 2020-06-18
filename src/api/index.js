import axios from 'axios'

import store from '../store'
import {api_url} from '../constants'

const fetchAPI = new Promise((resolve, reject) => (url, method, data, hasFile) => {
  let config = {
    method: method || 'GET',
    url: api_url + url,
    headers: {
      'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
    }
  }

  const token = store.getState().user.token
  if (token) {
    config.headers.Authorization = 'Token ' + token
  }

  if (hasFile) {
    const formData = new FormData()

    for (key in data) {

    }
  }

  axios(config).then(res => {
    resolve(res)
  }).catch(error => {
    reject(error)
  })
})
