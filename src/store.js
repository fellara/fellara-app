
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { AsyncStorage } from 'react-native'
import reducers from './reducers'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: []
}
/*
* Redux store is configured here.
*/
const persistedReducer = persistReducer(persistConfig, reducers)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
)
export const persistor = persistStore(store)
