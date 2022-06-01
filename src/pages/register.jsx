import { useEffect, useState } from "react";
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import Spinner from '../components/spinner'
import './css/register.css'
import Modal from "../components/Modals/routeModal";
import {BsFillLockFill, BsFillUnlockFill} from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import {FormControl, Input, Stack, FormLabel,InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Register = () => {

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData ] = useState({
        name: '',
        password: '',
        email: ''
    })
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const {name, password, email } = formData

    const changeText = (e) =>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(()=>{

        // //This secction makes sure that a user is not already signed in
        // if(user){
        //     toast.error("A user is already logged in. Kindly logout the current user.")
        //     setTimeout(()=>{
        //         navigate('/')
        //     },1000)
        // }
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            setTimeout(()=>{
                toast.success("Your Account is Successfully created!")
                setTimeout(()=>{
                    navigate('/login')

                },2000)
            },1000)
        }

    dispatch(reset())


    }, [user, isError, isSuccess,message,navigate, dispatch])

    const onSubmit =(e)=>{
        e.preventDefault();

        const data = {
            name,
            email,
            password
        }
        dispatch(registerUser(data))
    }
    const me = true

    return ( 
        <>
        {
            user ?  (

                <Modal header='A User already logged in' content='Kindly logout the current login user before you can register.' />
                // <div className="Error">
                //     <p>A user is already signed in. Kindly logout the current user.</p>
                // </div>
            ) : (
        <div className="register_wrapper">
            <div className="inner-wrapper">
                <header className="header">Please Create a User Account</header>
                <form onSubmit={onSubmit}>
                    <Stack spacing="24px">
                        <FormControl isRequired>
                            <Input type='text' size="md" value={name} name="name" id="name" 
                            onChange={changeText} placeholder="Enter Full Name" width="80%"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup  style={{display: 'flex', justifyContent: 'center'}}>
                                <Input type='email' value={email} name="email" id="email" 
                                onChange={changeText} placeholder="Enter Email" width="80%"
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
                                    onChange={changeText} width="80%"
                                />
                                <InputRightElement width="30%" >
                                    <span h='1.75rem' onClick={handleClick}>
                                    {show ? <BsFillUnlockFill style={{cursor: 'pointer'}} /> : <BsFillLockFill style={{cursor: 'pointer'}}/> }
                                    </span>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <section className="btn-box">
                        {
                            isLoading ? (
                                <Button
                                className="btn"
                                isLoading
                                 loadingText='Register'
                           
                                 colorScheme='burlywood'
                                 variant='solid'
                                 spinnerPlacement='start'
                                 type="submit"
                             >
                             </Button>
                            ): (
                            <button type="submit" className="btn">Register</button>
                            )
                        }

                        </section>
                    </Stack>

                </form>
                <section className="already-have-account">
                    <span>Already have an account? <Link to="/login" style={{textDecoration: 'none', color: 'blue'}}>Login</Link></span>
                </section>
                <ToastContainer/>
            </div>
            </div>
            )
    }
        </>
     );
}
 
export default Register;