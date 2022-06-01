import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import RouteAuthentication

// import RouteAuthentication from "../components/routeAuthModal";
import { autoLogout, getTokenExpirationTime, reset, tokenXp } from "../features/authSlice";
import AuthService from "../services/auth.service";
// import RouteModal,{RouteModalBody, RouteModalFooter, RouteModalHeader } from "../components/routeAuthModal";
import RouteModal, {RouteModalBody, RouteModalFooter,RouteModalHeader} from "../components/Modals/routeAuthModal";
import Modal from "../components/Modals/routeModal";

const Dashboard = () => {

    const {user, tokenExp } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const tokenExpire = AuthService.getTokenExpirationTime()


    useEffect(()=>{
        // console.log("Check  ", user)
        // if(tokenExp){
        //     navigate('/')
        // }
        // dispatch(getTokenExpirationTime())
        // dispatch(tokenXp())
        // dispatch(reset())

    }, [user, tokenExp, dispatch, navigate])
    

    //Content for the message to be displayed to user with unauthorize access.
    const content = (
        <section>
            <p>Only Logged in users can access this page.</p>
            <Link to='/login' style={{textDecoration: 'none'}}>Goto Login Page</Link>
        </section>
     
    )

    return ( 
        <>

        {
            user ? (
                <h1 style={{alignText: 'center'}}>Dashboard</h1>

            ): (
            <Modal header="Forbidden!" content={content} />
            )
        }
        </>
     );
}
 
export default Dashboard;