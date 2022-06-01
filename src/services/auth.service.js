import axios from 'axios';
import jwtDecode from "jwt-decode";

// export const user

export const UserBaseUrl = "http://localhost:3001/user/api/"
export const AuthBaseUrl = "http://localhost:3001/auth/api/"
// http://localhost:3000/register

const Register = async(data) => {
    const register = await axios.post(`${UserBaseUrl}register-react`, data)

    if(register.data){
         localStorage.setItem('user',JSON.stringify(register.data))
    }

    return register.data
}


const Login = async(data) =>{
    const login = await axios.post(`${AuthBaseUrl}login-react`, data)

    if(login.data){
         localStorage.setItem('user', JSON.stringify(login.data))
    }

    return login.data
}

const getCurrentUser = () =>{
    try {
        const token = localStorage.getItem("user")
        return jwtDecode(token)
    } catch (error) {
        return error
    }
}


const Logout = ()=>{
    localStorage.removeItem('user')
}

 const getTokenExpirationTime = ()=>{
     const { exp } = getCurrentUser();
     if(exp * 1000 < new Date().getTime()){
        console.log("the token has expired")
        
         return true
     } else {
        console.log("This token is still active")
         return false
     }
 }


 const AuthService = {
     register: Register,
     login: Login,
     logout: Logout,
     getCurrentUser,
     getTokenExpirationTime
 }


export default AuthService;