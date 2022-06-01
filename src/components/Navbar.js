import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { logout, reset } from '../features/authSlice';
import '../pages/css/navbar.css'
import AuthService from '../services/auth.service';
import { BsPersonCircle } from 'react-icons/bs';
import {   Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,Button } from '@chakra-ui/react';

const Navbar = () => {

    const {user } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{

    }, [user,dispatch,navigate])

    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return ( 
        <>
        <div className='navbar-wrapper'>
            <section className='brand_name_wrapper'>
            <Link className='links' to='/'>Home</Link>
            </section>
            <ul>
                {
                    user ? (
                        <div style={{display:'inline-flex', width: '30%', justifyContent:'center'}}>
                        <li>
                        <Menu>
                            <MenuButton colorScheme='pink'>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
                                    <BsPersonCircle /> Profile
                                </span>
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Profile'>
                                <MenuItem>
                                <Link to='/dashboard'>Dashboard</Link>
                                </MenuItem>
                                <MenuItem>Payments </MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup title='Help'>
                                <MenuItem>
                                <a  className='links' style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center'}} onClick={onLogout}>
                                    <FaSignOutAlt style={{marginRight: '7px'}} /> Logout
                                </a>
                                </MenuItem>
                                </MenuGroup>
                            </MenuList>
                            </Menu>
                        </li>
                        </div>
                    ): (
                        <>
                            <li>
                                <Link className='links'  to="/register"><FaUser/> Register</Link>
                            </li>
                            <li>
                                 <Link className='links'  to="/login"><FaSignInAlt /> Login</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </div>
        </>
     );
}
 
export default Navbar;