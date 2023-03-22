import { createSlice } from '@reduxjs/toolkit'

/***
 * 0 = Cerrado
 * 1 = Exito
 * 2 = Fallo
 * @type {Slice<{status: number}, {decrement: reducers.decrement, incrementByAmount: reducers.incrementByAmount, increment: reducers.increment}, string>}
 */
export const feedbackSlice = createSlice({
    name: 'alert',
    initialState: {
        isLoading: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        }
    }
})

// Action creators are generated for each case reducer function
export const { setIsLoading } = feedbackSlice.actions

export default feedbackSlice.reducer