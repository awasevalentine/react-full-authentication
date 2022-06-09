
import {BsArrowRight } from 'react-icons/bs'
import {Box, Button, SlideFade } from '@chakra-ui/react'
import './css/home.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {

    const {user} = useSelector((state)=> state.auth)

    useEffect(()=>{

    }, [user])


    return (
        <>
            <section className="content-wrapper">
                <header className="header-wrapper">React Authentication App</header>
                <Box className='section_wrapper'>
                <section className='content'>
                <p>Exploring ReactJs Authentication Processes and getting to know the various Hooks responsible for 
                    handling different authentication process.</p>
                </section>
                <section className='btn-box'>
                    {
                        user ? (
                            <Button color="#242F9B" w="200px" className='home-btn' rightIcon={<BsArrowRight />} colorScheme='#FF8C8C' variant='solid'>
                                <Link to='/dashboard'>Go to Dashboard</Link>
                            </Button>
                        ): (
                            <Button className='home-btn' rightIcon={<BsArrowRight />} colorScheme='#FF8C8C' variant='solid'>
                                <Link to='/register'>Get started</Link>
                            </Button>
                        )
                    }

                </section>
                </Box>
            </section>

        </>
      );
}
 
export default Home;