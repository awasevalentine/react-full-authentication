import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import {Link } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify'
import Spinner from "../components/spinner";
import Modal from "../components/Modals/routeModal";
import {Stack, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import {MdEmail} from 'react-icons/md'
import {BsFillUnlockFill, BsFillLockFill} from 'react-icons/bs'


const Login = () => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message } = useSelector((state)=> state.auth)
    const navigation = useNavigate()
    const [userData, setUserData ] = useState(
        {
            email: '',
            password: ''
        })

    const {email, password } = userData;

    const onTextChange = (e)=>{
        setUserData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        const data={
            email,
            password
        }

        dispatch(loginUser(data))
    }


    useEffect(()=>{

        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            navigation('/dashboard')
            console.log("Login sucessfull")
            console.log("user Data is ", JSON.parse(localStorage.getItem('user')))
        }

        dispatch(reset())

    },[user,isError,isLoading,isSuccess,dispatch,navigation])


    if(isLoading){
        <Spinner/>
    }

    return ( 
        <>
        {
            user ? (
                <Modal header="A User is already logged in" content="Kindly logout the current logged in user first." />
            ) : (
                <div className="register_wrapper">
                <div className="inner-wrapper">
                    <header className="header">Please Create a User Account</header>
                    <form onSubmit={onSubmit}>
                    <Stack spacing="24px">
                        <FormControl isRequired>
                            <InputGroup  style={{display: 'flex', justifyContent: 'center'}}>
                                <Input type='email' value={email} name="email" id="email" 
                                onChange={onTextChange} placeholder="Enter Email" width="80%"
                                />
                                <InputRightElement width="30%">
                                    <MdEmail />
                                </InputRightElement>
                            </InputGroup>

                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup style={{display: 'flex', justifyContent: 'center'}}>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password' name="password" id="password"
                                    onChange={onTextChange} width="80%"
                                />
                                <InputRightElement width="30%" >
                                    <span h='1.75rem' onClick={handleClick}>
                                    {show ? <BsFillUnlockFill style={{cursor: 'pointer'}} /> : <BsFillLockFill style={{cursor: 'pointer'}}/> }
                                    </span>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <section className="btn-box">
                        <button type="submit" className="btn">Login</button>
                        </section>
                        </Stack>
                    </form>
                    <section className="already-have-account">
                        <span>Don't have an account? <Link to="/register" style={{textDecoration: 'none', color: 'blue'}}>Register</Link></span>
                    </section>
                    <ToastContainer/>
                </div>
                </div>
            )
        }

        </>
     );
}
 
export default Login;