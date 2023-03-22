import { createSlice } from '@reduxjs/toolkit'

export const Users = createSlice({
  name: 'Users',
  initialState: {
    CurrentUser: null,
    Users: [],
    Actualizar:0,
    CurrentRol: null,
    UserID: null,
    UrlAvatar: null,
    Nombre: '',
    Apellidos: ''
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.Users = action.payload.Users
    },
    setActualizarUsuarios:(state)=>{
      state.Actualizar =Math.random();
    },
    setUserData:(state,action)=>{
        state.CurrentRol = action.payload.CurrentRol
        state.UserID = action.payload.UserID
    },
    setCurrentUser:(state,action)=>{
      state.CurrentUser = action.payload.CurrentUser
    },
    setUrlAvatar:(state,action)=>{
      state.UrlAvatar = action.payload.UrlAvatar
      localStorage.setItem('UrlAvatar',action.payload.UrlAvatar)
    },
    setNombre:(state,action)=>{
      state.Nombre = action.payload.Nombre
      localStorage.setItem('Nombre',action.payload.Nombre)
    },
    setApellidos:(state,action)=>{
      state.Apellidos = action.payload.Apellidos
      localStorage.setItem('Apellidos',action.payload.Apellidos)
    }
  }
})

export const { setAllUsers,setActualizarUsuarios,setUserData,setCurrentUser,setUrlAvatar, setNombre, setApellidos } = Users.actions

export default Users.reducer