import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { inputstyle,headingStyle } from './Signup';
import { useNavigate } from 'react-router-dom'; 

export default function Login(props) {

    const navigate = useNavigate();
    const [UserName, setUserName] = useState('');
    const [Password,setPassword] = useState('');

    
    const SubmitHandler = (e) =>{
        e.preventDefault();
        let data = new FormData();
        data.append('username',UserName);
        data.append('password',Password);

        axios.post('http://localhost:80/coursemanager/src/service/login.php',data)
        .then(res=>{
            console.log(res.data);
            if(res.data === "Login Successfull"){
                props.handleLogin(true);
                props.handleUsername(UserName);
                
            }
            else{
                alert(res.data);
            }
        })

        
    }
  return (
    <div className='App-header'> 
    <h1 style={headingStyle}>Login</h1>
        <form onSubmit={SubmitHandler}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="username"   className='rounded' value={UserName} onChange={e=>setUserName(e.target.value)} style={inputstyle} placeholder="Username" required/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" className='Rounded' value={Password} onChange={e=>setPassword(e.target.value)} style={inputstyle} placeholder="Password" required/>
            <br />
            <input type="submit" value="Login" className='btn btn-primary m-3' />
            <input type="button" value="Go To Signup" className='btn  btn-primary rounded' onClick={e=>navigate('/')} />
        </form>

    </div>
  )
}
