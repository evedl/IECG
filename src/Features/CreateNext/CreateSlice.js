import { createSlice } from '@reduxjs/toolkit'

export const nextSlice = createSlice({
  name: 'next',
  initialState: {
    status: 0,
    id: '',
    img: ''
  },
  reducers: {
    setNext: (state, action) => {
      state.status = action.payload.status
    },
    setImg: (state, action) => {
      state.id = action.payload.id
    },
  }
})

// Action creators are generated for each case reducer function
export const { setNext, setImg } = nextSlice.actions

export default nextSlice.reducer