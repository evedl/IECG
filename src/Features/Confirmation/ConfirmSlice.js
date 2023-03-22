import { createSlice } from '@reduxjs/toolkit'

export const EmailConfirmation = createSlice({
  name: 'confirm',
  initialState: {
    status: 0,
    userId: null,
  },
  reducers: {
    setConfirm: (state, action) => {
      state.status = action.payload.status
    },
    setUserId: (state, action) => {
      state.userId = action.payload.userId
    }
  }
})

export const { setConfirm,setUserId } = EmailConfirmation.actions

export default EmailConfirmation.reducer