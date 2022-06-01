
import {BsArrowRight } from 'react-icons/bs'
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
                <button className='home-btn'>Get Start <BsArrowRight className='icon'/></button>
                </section>
            </section>

        </>
      );
}
 
export default Home;