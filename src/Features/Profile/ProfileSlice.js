import {createSlice} from "@reduxjs/toolkit";

export const Profile = createSlice({
    name: "profile",
    initialState: {
        step: 0,
        Municipio:null,
        Comunidad:null,
        Telefono:null,
        Facebook:null,
        Etiquetas:[],
        Update:null,
        avatar: null,

        Title:"",
        StartPeriod:null,
        EndPeriod:null,
        Description:"",
        Tipo:""

    },
    reducers:{
        setStep: (state, action) => {
            state.step = action.payload.step
        },
        setUpdate: (state) => {
            state.Update=Math.random()
        },
        setBasicData: (state, action) => {
            switch(action.payload.action){
                case "Facebook":
                    state.Facebook=action.payload.Facebook
                    break
                case "Telefono":
                    state.Telefono = action.payload.Telefono
                    break
                case "setComunidad":
                    state.Comunidad = action.payload.Comunidad
                    break
                case "setMunicipio":
                    state.Municipio = action.payload.Municipio
                    break;
                case "setEtiquetas":
                    return {
                        ...state,
                        Etiquetas: [...state.Etiquetas, action.payload.Etiqueta]
                    }
                case "deleteEtiqueta":
                    const EtiquetasFilter = state.Etiquetas.filter((etiqueta) => {
                        return etiqueta !== action.payload.Etiqueta;
                    })
                    state.Etiquetas= EtiquetasFilter
                    return
                default:
                    break;
            }
        },
        setTrayectoria: (state, action) => {
            switch(action.payload.action){
                case "setTipo":
                    state.Tipo = action.payload.Tipo
                    break
                case "setTitle":
                    state.Title = action.payload.Title
                    break;
                case "setStart":
                    state.StartPeriod=action.payload.StartPeriod
                    break;
                case "setEnd":
                    state.EndPeriod=action.payload.EndPeriod
                    return
                case "setDescription":
                    state.Description = action.payload.Description
                    break;
                case 'setAvatar':
                    state.avatar = action.payload.avatar
                    break;
                case "Clean":
                    state.Title=""
                    state.StartPeriod=null
                    state.EndPeriod=null
                    state.Description=""
                    state.avatar = null
                    state.Etiquetas = []
                    break;
                default:
                    break;
            }
        },
    }
})

export const {setStep,setBasicData,setUpdate,setTrayectoria} = Profile.actions
export default Profile.reducer