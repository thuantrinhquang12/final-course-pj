import { createSlice } from '@reduxjs/toolkit'
import ReducerRegister from '../../../../store/reducerRegister'

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    isLoading: false,
    errorMessage: '',
    currentUser: null,
  },

  reducers: {
    loginAccess: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { loginAccess } = userSlice.actions
ReducerRegister.register(userSlice.name, userSlice.reducer)
