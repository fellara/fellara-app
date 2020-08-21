import {Platform} from 'react-native'
import {base_url, api_url} from '../constants'

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
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const formatURL = (url) => {
  let new_url = api_url + url
  let source = `source=${Platform.OS === 'web' ? 'PWA' : Platform.OS.toUpperCase()}`
  if (url.includes('?')) return new_url + '&' + source
  else return new_url + '?' + source
}