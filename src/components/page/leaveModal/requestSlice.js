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
<<<<<<< HEAD
    message: null,
=======
>>>>>>> b4095e29d9551734ea081ca64b357726bcf55e80
    status: null,
  },
  extraReducers: {
    [getRequests.pending]: (state) => {
      state.status = 'loading'
    },
    [getRequests.fulfilled]: (state, action) => {
      state.status = 'success'
      state.request = action.payload
<<<<<<< HEAD
      state.message = null
=======
>>>>>>> b4095e29d9551734ea081ca64b357726bcf55e80
    },
    [getRequests.rejected]: (state) => {
      state.status = 'failed'
    },
<<<<<<< HEAD
    [postRequests.fulfilled]: (state, action) => {
      state.message = 'Create request successfully'
    },
    [putRequests.fulfilled]: (state, action) => {
      state.message = 'Edit request successfully'
    },
    [deleteRequests.fulfilled]: (state, action) => {
      state.message = 'Delete request successfully'
=======
    [postRequests.pending]: (state, action) => {
      state.status = 'loadingRegister'
    },
    [postRequests.fulfilled]: (state, action) => {
      state.status = 'successRegister'
    },
    [putRequests.pending]: (state, action) => {
      state.status = 'loadingUpdate'
    },
    [putRequests.fulfilled]: (state, action) => {
      state.status = 'successUpdate'
    },
    [deleteRequests.pending]: (state, action) => {
      state.message = 'loadingDelete'
    },
    [deleteRequests.fulfilled]: (state, action) => {
      state.status = 'successDelete'
>>>>>>> b4095e29d9551734ea081ca64b357726bcf55e80
    },
  },
})
ReducerRegistry.register(requestsSlice.name, requestsSlice.reducer)
