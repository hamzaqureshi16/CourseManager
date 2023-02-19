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
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
        {!isLoggedIn && <div>
          <Routes>
            <Route path='/' index element={<Signup />}></Route>
            <Route path='/login' element={<Login handleLogin = {setisLoggedIn} handleUsername = {setusername}/>}></Route>
          </Routes>
        </div>
        }
        {isLoggedIn && <div>
          <Navbar username = {username}></Navbar>
        <Routes> 
          <Route path='/' index element={<Home />}></Route>
          <Route path='/apply' element={<Form />}></Route>
        </Routes></div>}
    </div>
  );
}

export default App;
