import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerRegister from './reducerRegister'

const store = configureStore({
  reducer: {
    ...reducerRegister.reducers,
  },
})

console.log(store.getState())
reducerRegister.setChangeListener((reducers) => {
  store.replaceReducer(
    combineReducers({
      ...reducers,
    }),
  )
})

export default store
