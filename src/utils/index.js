import {Platform} from 'react-native'
import {base_url, api_url, app_url} from '../constants'

export const urltoFile = (dataurl, filename)  => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomFloat(max) {
  return Math.random() * Math.floor(max);
}

export const checkRegex = (text, regex) => {
  return regex.test(text)
  // return new RegExp(text, 'g').test(text) // 'g' is for global search
} 

export const getImageUrl = (url) => {
  if (!url) return
  return url.startsWith('http') ? url : base_url + url
}

export const capitalize = (text) => {
  let capitalized = ''
  try {
    capitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  } catch(error) {
    capitalized = text
  }
  return capitalized
}

export const formatURL = (url) => {
  let new_url = api_url + url
  let source = `source=${Platform.OS === 'web' ? 'PWA' : Platform.OS.toUpperCase()}`
  if (url.includes('?')) return new_url + '&' + source
  else return new_url + '?' + source
}

export const getPostSharableLink = (id, noUtm) => {
  let new_url = app_url + 'p/' + id + '/'
  let source = `utm_source=${Platform.OS === 'web' ? 'pwa' : Platform.OS}_sharable_link`
  if (noUtm) return new_url
  return new_url + '?' + source
}

export const getProfileLink = (id, noUtm, isMine) => {
  let new_url = app_url
  if (!isMine) {
    new_url += 'root/others-profile?id=' + id
  } else {
    new_url += 'root/tabs/Profile'
  }

  let source = `utm_source=${Platform.OS === 'web' ? 'pwa' : Platform.OS}_sharable_link`
  if (noUtm) return new_url
  return new_url + '?' + source
}

export const getProfileSharableLink = (id, noUtm) => {
    let new_url = app_url + 'u/' + id + '/'
    let source = `utm_source=${Platform.OS === 'web' ? 'pwa' : Platform.OS}_sharable_link`
    if (noUtm) return new_url
    console.log((new_url + '?' + source));
    return new_url + '?' + source
}

export const getPostLink = (id, tag, noUtm) => {
  let new_url = app_url + `root/post?id=${id}&tag=${tag}`

  let source = `utm_source=${Platform.OS === 'web' ? 'pwa' : Platform.OS}_sharable_link`
  if (noUtm) return new_url
  return new_url + '?' + source
}
