import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Form from './components/testform';
import Home from './components/Home';

import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Routes>
            <Route path='/home' element={<Home />}></Route>
          <Route path='/apply' element={<Form />}></Route>
        </Routes>
    </div>
  );
}

export default App;
