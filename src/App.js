import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/register';
import Login from './pages/login';
import '../src/App.css'
import Dashboard from './pages/dashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <div className='main-content-wrapper'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
