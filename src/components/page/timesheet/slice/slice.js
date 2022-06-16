import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../../service/requestApi'
import reducerRegistry from '../../../../store/reducerRegister'

export const getTimesheet = createAsyncThunk(
  'getTimesheet',
  async ({ params }) => {
    const { page, sort, start, end } = params
    if (sort == 'ascending') {
      const res = await get(`/worksheet?page=${page}`)
      return res
    } else {
      const res = await get(
        `/worksheet?sort=desc&start_date=${start}&end_date=${end}&per_page=30`,
      )
      return res
    }
  },
)

const timeSheetSlice = createSlice({
  name: 'timesheet',
  initialState: {
    worksheet: [],
    isLoading: false,
  },
  extraReducers: {
    [getTimesheet.fulfilled]: (state, action) => {
      state.worksheet = action.payload
      state.isLoading = false
    },
    [getTimesheet.pending]: (state) => {
      ;(state.worksheet = []), (state.isLoading = true)
    },

    [getTimesheet.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

reducerRegistry.register(timeSheetSlice.name, timeSheetSlice.reducer)
