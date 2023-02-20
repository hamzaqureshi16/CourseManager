import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Form from './components/testform';
import Home from './components/Home';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  const [username,setusername] = useState();
  const [id, setID] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [role,setrole] = useState('');

  return (
    <div className="App">
        {!isLoggedIn && <div>
          <Routes>
            <Route path='/' index element={<Signup />}></Route>
            <Route path='/login' element={<Login handleLogin = {setisLoggedIn} handleUsername = {setusername} handlerole = {setrole} handelid = {setID} />}></Route>
          </Routes>
        </div>
        }
        {isLoggedIn && <div>
          <Navbar username = {username} handlelogout = {setisLoggedIn} ></Navbar>
        <Routes> 
          <Route path='/' index element={<Home role={role} id = {id}/> }></Route>
          <Route path='/apply' element={<Form />}></Route>
        </Routes></div>}
    </div>
  );
}

export default App;
