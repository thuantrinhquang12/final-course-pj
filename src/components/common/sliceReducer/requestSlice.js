import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reducerRegistry from '../../../store/reducerRegister'
import { get, post, put, del } from '../../service/requestApi'

export const getRequests = createAsyncThunk(
  'requests/getRequests',
  async (id) => {
    if (id === -1) {
      return {}
    }
    return await get(`requests/${id}`)
  },
)

export const postRequests = createAsyncThunk(
  'requests/postRequests',
  async (data) => {
    return await post('requests', data)
  },
)

export const putRequests = createAsyncThunk(
  'requests/putRequests',
  async (data) => {
    const { id, requestData } = data
    return await put(`requests/${id}`, requestData)
  },
)

export const deleteRequests = createAsyncThunk(
  'requests/deleteRequests',
  async (id) => {
    return await del(`requests/${id}`)
  },
)

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    request: {},
    status: null,
  },
  extraReducers: {
    [getRequests.pending]: (state) => {
      state.status = 'loading'
    },
    [getRequests.fulfilled]: (state, action) => {
      state.status = 'success'
      state.request = action.payload
    },
    [getRequests.rejected]: (state) => {
      state.status = 'failed'
    },
<<<<<<< HEAD:src/components/page/leaveModal/requestSlice.js
    [postRequests.pending]: (state, action) => {
=======
    [postRequests.pending]: (state) => {
>>>>>>> 81bd95dd502fea952c2df6143579f686bf94eac0:src/components/common/sliceReducer/requestSlice.js
      state.status = 'loadingRegister'
    },
    [postRequests.fulfilled]: (state) => {
      state.status = 'successRegister'
    },
    [putRequests.pending]: (state) => {
      state.status = 'loadingUpdate'
    },
    [putRequests.fulfilled]: (state) => {
      state.status = 'successUpdate'
    },
    [deleteRequests.pending]: (state) => {
      state.message = 'loadingDelete'
    },
    [deleteRequests.fulfilled]: (state) => {
      state.status = 'successDelete'
    },
  },
})

reducerRegistry.register(requestsSlice.name, requestsSlice.reducer)
