import { createSlice } from '@reduxjs/toolkit'

const PublicationsSplit = (state,payload) =>{
    let i
    let Publications= payload.Publications
    state.Publications=[]
    let PublicationsCount = (10*parseInt(payload.index))
    i=PublicationsCount
    if(PublicationsCount<=-1){
        PublicationsCount=0
    }
    if(payload.index===1){
        i = 0
    }else {
        i=i-10
    }

    for(i; i < PublicationsCount; i++) {
        if(Publications[i]!==undefined){
            state.Publications.push(Publications[i])
        }
    }
}

export const publicationSlice = createSlice({
    name: 'publication',
    initialState: {
        Publications:[],
        TotalPublications:[],
        actualizar:0
    },
    reducers: {
        setPublications:(state,action)=>{
            state.TotalPublications=action.payload.Publications
            PublicationsSplit(state,action.payload)
        },
        setActualizar:(state)=>{
            state.actualizar =Math.random();
        },

    }
})

// Action creators are generated for each case reducer function
export const { setPublications, setActualizar } = publicationSlice.actions

export default publicationSlice.reducer