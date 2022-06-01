import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerRegister from './ReducerRegister'

const store = configureStore({
  reducer: {
    ...reducerRegister.reducers,
  },
})

reducerRegister.setChangeListener((reducers) => {
  store.replaceReducer(
    combineReducers({
      ...reducers,
    }),
  )
})

export default store
