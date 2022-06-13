import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reducerRegistry from '../../../../store/reducerRegister'
import { get } from '../../../service/requestApi'

export const getDataListNotice = createAsyncThunk(
  'noticeList/getDataListNotice',
  async (perPage, page) => {
    const response = await get(
      `/notification?per_page=${perPage}&page=${page}&sort=asc`,
    )
    return response.data
  },
)

const initialState = { tableData: [], per_page: 10, page: 1 }

const noticeList = createSlice({
  name: 'noticeList',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataListNotice.fulfilled, (state, action) => {
      console.log('action', action.payload)
      state.tableData = action.payload
    })
  },
})

export const { increment, decrement } = noticeList.actions
reducerRegistry.register(noticeList.name, noticeList.reducer)
