import { Navigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from 'jwt-decode'

const ValidToken = ()=>{
    let config = {
        method: 'get',
        url: process.env.REACT_APP_API_URL+'/users/valid',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO')
        }
    };

    axios(config)
        .then((response) => {
        })
        .catch((error) => {
            localStorage.removeItem('GTO')
            window.location = "/login"
        });

}


const ProtectedRoute = ({ children,Authorize }) => {
    const token = localStorage.getItem('GTO')
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    let data = jwtDecode(token).Rol
    ValidToken()
    if(Authorize) {
        if(data===50){
          if(!Authorize.includes("AdminRoot")) return  <Navigate to="/home" replace />;
        }
        if(data!==50 && data!== 0){
            if(!Authorize.includes("Admin")) return  <Navigate to="/home" replace />;
        }
        if(data===0){
            if(!Authorize.includes("User")) return  <Navigate to="/home" replace />;
        }

            /*


            if(Authorize.includes("AdminRoot")){
                if(jwtDecode(token).Rol !== 50){
                    return <Navigate to="/home" replace />;
                }

            }
            if(Authorize.includes("Admin")){
                if((jwtDecode(token).Rol === 50 || jwtDecode(token).Rol === 0) && !Authorize.includes("AdminRoot")){
                    return <Navigate to="/home" replace />;
                }
            }
            if(Authorize.includes("User")){
                if(jwtDecode(token).Rol !== 0 && (!Authorize.includes("AdminRoot") && !Authorize.includes("Admin"))){
                    return <Navigate to="/home" replace />;
                }
            }
        }

             */
    }
    return children;

};
export default  ProtectedRoute