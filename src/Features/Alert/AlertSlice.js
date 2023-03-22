import { createSlice } from '@reduxjs/toolkit'

/***
 * 0 = Cerrado
 * 1 = Exito
 * 2 = Fallo
 * @type {Slice<{status: number}, {decrement: reducers.decrement, incrementByAmount: reducers.incrementByAmount, increment: reducers.increment}, string>}
 */
export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        status: 0,
        msg:'',
        errors: []
    },
    reducers: {
        setText:(state,action)=>{
            state.msg =action.payload.msg
            state.status = action.payload.status
        },
        setClose: (state)=>{
            state.status = 0
        },
        setErrors:(state, action) => {
            state.errors = action.payload.errors
            state.status = action.payload.status
        }

    }
})

// Action creators are generated for each case reducer function
export const { setText,setClose, setErrors  } = alertSlice.actions

export default alertSlice.reducer