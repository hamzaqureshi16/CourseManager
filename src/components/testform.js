import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Testform() {
    const navigate = useNavigate();
const formstyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
}
const submitstyle ={
    width: '100px',
    height: '50px',
    backgroundColor: 'lightgreen',
    border: 'none',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white'

     

}

const [name,setname] = useState('');
const [email,setemail] = useState('');

const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name',name);
    data.append('email',email);

      axios.post('http://localhost:80/coursemanager/src/service/Api.php',data).then(res => alert(res.data));
        navigate('/home');
}


    return (
    <div className='App-header'>
        <div style={formstyle}>
            <label>
                Name: 
                <input  type="text" className='rounded' name="name" value={name} onChange = {(e)=>setname(e.target.value)} />
            </label>
            <br />
            <label >Email: 
                <input type="email" name="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} className='rounded' />
            </label>
            <br />
            <input style={submitstyle} onClick={(e)=>submit(e)} type="submit" value="Submit" />
        </div>
       
    </div>
  )
}
