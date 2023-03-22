import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route, Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Views/Auth/Login"
import Alert from './Components/Feedback/Alert'
import ProtectedRoute from './ProtectedRoute'
import StepsRegister from "./Views/Auth/StepsRegister"
import Dashboard from "./Views/Home/Dashboard"
import VWpublication from "./Views/Publications";
import VWpublicationVisible from "./Views/PublicationsVisible";
import RequestResetPassword from './Views/Auth/RequestResetPassword'
import ResetPassword from "./Views/Auth/ResetPassword";
import Actualizar from "./Views/Actualizar/Actualizar";
import Create from "./Views/Create/Create";
import PublicationCompleta from "./Views/VerMas";
import ConfirmEmailJWT from "./Views/Auth/ConfirmEmailJWT";
import NotFound from "./Views/NotFound";
import Category from "./Views/Categorys/Category";
import CategoryVisible from "./Views/Categorys/CategoryVisible";
import Userlist from "./Views/Users/Userlist";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "./Features/Users/UsersSlice";
import jwtDecode from "jwt-decode";
import CompleteProfile from "./Views/Perfil/CompleteProfile";
import Acevo from "./Views/Users/Acervo";
import PerfilCompleto from "./Views/Perfil/PerfilCompleto";
import Account from './Views/Users/ProfileUser';

function App() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('GTO')
    const UserID = useSelector(state => state.users.UserID)
    React.useEffect(()=>{
        if(token && UserID === null){
            const TokenDecode = jwtDecode(token)
            dispatch(setUserData({CurrentRol:TokenDecode.Rol,UserID:TokenDecode.id}))
        }
    })
    return (
      <BrowserRouter>
          <Navbar/>
            <Routes>
                <Route path="/acervo/usuario/:id" element={
                    <ProtectedRoute Authorize={["AdminRoot"]}>
                        <PerfilCompleto/>
                    </ProtectedRoute>
                } />

                <Route path="/acervo" element={
                    <ProtectedRoute Authorize={["AdminRoot"]}>
                        <Acevo/>
                    </ProtectedRoute>
                } />

                <Route path="/identidad/perfil" element={
                    <ProtectedRoute Authorize={["User"]}>
                        <CompleteProfile/>
                    </ProtectedRoute>

                }/>
                <Route path="/usuarios" element={
                    <ProtectedRoute Authorize={[
                        "AdminRoot",
                    ]}>
                        <Userlist/>
                    </ProtectedRoute>} />
                <Route path='/password' element={<RequestResetPassword/>} />
                <Route path='/reset/password/:token' element={<ResetPassword/>} />
                <Route path="/publicaciones" element={
                    <ProtectedRoute Authorize={[
                        "AdminRoot",
                    ]}>
                <VWpublication/>
                </ProtectedRoute>} />
                <Route path="/publicaciones/:index" element={
                <ProtectedRoute Authorize={[
                        "AdminRoot",
                    ]}>
                <VWpublication/>
                </ProtectedRoute>} />
                <Route path="/publicaciones/visible/:index" element={<VWpublicationVisible/>} />
                <Route path="/publicaciones/visible" element={<VWpublicationVisible/>} />     
                <Route path="/crear" element={
                <ProtectedRoute Authorize={[
                    "AdminRoot","Admin"
                ]}>
                    <Create />
                </ProtectedRoute>
                }/>
                <Route path="/singup" element={<StepsRegister/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/confirmar/correo/:token" element={<ConfirmEmailJWT/>}/>
                <Route path="*" element={<NotFound/>}/>

                <Route path="/publicaciones/categoria/:categoria" element={
                    <ProtectedRoute Authorize={[
                        "AdminRoot","Admin"
                    ]}>
                    <Category />
                    </ProtectedRoute>
                }/>

                <Route path="/publicaciones/categoria/:categoria/:index" element={
                    <ProtectedRoute Authorize={[
                        "AdminRoot","Admin"
                    ]}>
                    <Category />
                    </ProtectedRoute>
                }/>

                <Route path="/publicaciones/categoria/visible/:categoria/:index" element={
                    <ProtectedRoute>
                    <CategoryVisible />
                    </ProtectedRoute>
                }/>

                <Route path="/publicaciones/categoria/visible/:categoria" element={
                    <ProtectedRoute>
                    <CategoryVisible />
                    </ProtectedRoute>
                }/>

                
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="/update/:id" element={
                    <ProtectedRoute Authorize={[
                        "AdminRoot","Admin"
                    ]}>
                        <Actualizar/>
                    </ProtectedRoute>
                }/>

                <Route path="/vermas/:id" element={
                    <ProtectedRoute>
                        <PublicationCompleta/>
                    </ProtectedRoute>
                } />

                <Route path="/perfilcompleto" element = {
                    <ProtectedRoute>
                        <Account/>
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/login" replace />}/>

            </Routes>
          <Alert/>
      </BrowserRouter>
  );
}

export default App;
