
import {BsArrowRight } from 'react-icons/bs'
import {Button } from '@chakra-ui/react'
import './css/home.css'

const Home = () => {


    return (
        <>
            <section className="content-wrapper">
                <header className="header-wrapper">Basic React Authentication App</header>
                <section className='content'>
                <p>Exploring ReactJs Authentication Processes and getting to know the various Hooks responsible for 
                    handling different authentication process.</p>
                </section>
                <section className='btn-box'>
                <Button className='home-btn' rightIcon={<BsArrowRight />} colorScheme='#FF8C8C' variant='solid'>
                    Get started
                </Button>
                </section>
            </section>

        </>
      );
}
 
export default Home;