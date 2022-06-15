import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { get, post } from '../../../service/requestApi'
import reducerRegistry from '../../../../store/reducerRegister'

// export const getTimesheet = createAsyncThunk('getTimesheet', async () => {
//   const res = await get('/worksheet', {})
//   return res.data
// })
// export const postTimesheet = createAsyncThunk('postTimesheet', async (data) => {
//   const { url, requestForm } = data
//   return await post(url, requestForm)
// })
// const timeSheetSlice = createSlice({
//   name: 'timesheet',
//   initialState: {
//     worksheet: [],
//     isLoading: false,
//   },
//   extraReducers: {
//     [getTimesheet.pending]: (state) => {
//       ;(state.worksheet = []), (state.isLoading = true)
//     },
//     [getTimesheet.fulfilled]: (state, action) => {
//       state.worksheet = action.payload
//       state.isLoading = false
//     },
//     [getTimesheet.rejected]: (state) => {
//       state.isLoading = false
//     },
//     [postTimesheet.pending]: (state) => {
//       state.isLoading = true
//     },
//     [postTimesheet.fulfilled]: (state, action) => {
//       ;(state.worksheet = action.payload), (state.isLoading = false)
//     },
//   },
// })

const postsSlice = createSlice({
  name: 'postR',
  initialState: {},
  reducers: {
    // createPost(state, action) {},
    // updatePost(state, action) {},
    // deletePost(state, action) {},
  },
})
console.log(postsSlice)
reducerRegistry.register(postsSlice.name, postsSlice.reducer)
