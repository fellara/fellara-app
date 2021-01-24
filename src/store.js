
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler'
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers'

const isClient = typeof window !== 'undefined';
export let store;

if (isClient) {
  const { persistReducer } = require('redux-persist');
  const autoMergeLevel2 = require('redux-persist/es/stateReconciler/autoMergeLevel2').default;
  // const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['toasts', 'musics']
  }
  
  const persistedReducer = persistReducer(persistConfig, reducers)
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  
  store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk),
    )
  )
} else {
  store = createStore(
    reducers,
    applyMiddleware(thunk),
  );
}
export const persistor = persistStore(store)

