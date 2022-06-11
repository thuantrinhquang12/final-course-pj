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

export const getRequestsOfDay = createAsyncThunk(
  'requests/getRequestsOfDay',
  async (data) => {
    const { url, date } = data
    console.log('thunk get run')
    if (date === -1) {
      console.log('date -1')
      return {}
    }
    const response = await get(url, {
      request_for_date: date,
    })
    return !response.code ? response : {}
  },
)

export const postRequests = createAsyncThunk(
  'requests/postRequests',
  async (data) => {
    const { url, requestData } = data
    return await post(url, requestData)
  },
)

export const putRequests = createAsyncThunk(
  'requests/putRequests',
  async (data) => {
    const { id, requestData, url } = data
    return await put(url + id, requestData)
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
    [getRequestsOfDay.pending]: (state) => {
      console.log('get pending')
      state.status = 'loading'
    },
    [getRequestsOfDay.fulfilled]: (state, action) => {
      console.log('get fulfilled')
      state.status = 'success'
      state.request = action.payload
    },
    [getRequestsOfDay.rejected]: (state) => {
      state.status = 'failed'
    },
    [postRequests.pending]: (state) => {
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
