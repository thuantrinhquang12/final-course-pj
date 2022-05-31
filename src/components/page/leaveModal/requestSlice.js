import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ReducerRegistry from '../../../store/ReducerRegister'
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
    message: null,
    status: null,
  },
  extraReducers: {
    [getRequests.pending]: (state) => {
      state.status = 'loading'
    },
    [getRequests.fulfilled]: (state, action) => {
      state.status = 'success'
      state.request = action.payload
      state.message = null
    },
    [getRequests.rejected]: (state) => {
      state.status = 'failed'
    },
    [postRequests.fulfilled]: (state, action) => {
      state.message = 'Tạo request thanh cong'
    },
    [putRequests.fulfilled]: (state, action) => {
      state.message = 'Sua thanh cong'
    },
    [deleteRequests.fulfilled]: (state, action) => {
      state.message = 'Xoá thanh cong'
    },
  },
})
ReducerRegistry.register(requestsSlice.name, requestsSlice.reducer)
