import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../../service/requestApi'
import ReducerRegister from '../../../../store/ReducerRegister'

export const login = createAsyncThunk('user/login', async (data) => {
  const res = await post(data)
  return res
})

const userSlice = createSlice({
  name: 'userInfo',

  initialState: {
    isLoading: false,
    errorMessage: '',
    currentUser: null,
  },

  reducers: {
    logout: (state) => {
      state.currentUser = null
      state.errorMessage = ''
    },
    loginAccess: (state, action) => {
      state.currentUser = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
      state.currentUser = action.payload.currentUser
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
    })

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })
  },
})

export const { loginAccess } = userSlice.actions
ReducerRegister.register(userSlice.name, userSlice.reducer)
