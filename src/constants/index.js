// export const base_url = 'http://localhost:8000/'
export const base_url = 'https://fellara.com/'
export const app_url = 'https://app.fellara.com/'
export const api_url = base_url + 'api/v1/'

export const isClient = typeof window !== 'undefined';

export const isInStandaloneMode = (('standalone' in window.navigator) && (window.navigator.standalone)) ||  (window.matchMedia('(display-mode: standalone)').matches);
