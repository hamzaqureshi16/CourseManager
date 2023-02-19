import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const inputstyle = {
    width:"100%",
    height:"45px",
    margin:"10px"
}
export const headingStyle = {
    color:"white",
    textAlign:"center",
    margin:"10px"

}
export default function Signup() {
    const navigation = useNavigate();
  

    const [isTeacher,setisTeacher] = useState(false); 
    const [sessionsGenerated, setSessionsGenerated] = useState(false);
    const [sessions,setsessions] = useState([]);

    //make a form data state
     const [formData,setFormData] = useState({});
     const [program,setprogram] = useState('BCS');
     const [session, setsession] = useState('FA01');
     const [roll,setroll] = useState('');

    const handleRole = (e) =>{
        setisTeacher(e.target.value === 'teacher' ? true : false);
        console.log(isTeacher);
    } 
 useEffect(() => {
    var sessions = [];
    let x;
    for (let i = 2001; i < new Date().getFullYear(); i++) {
        x = i - 2000;
        sessions.push("FA" + (x.toString().length === 1 ? "0" + x : x));
        sessions.push("SP" + (x.toString().length === 1 ? "0" + x : x));
    }
    setsessions(sessions);
    setSessionsGenerated(true);
}, []);


const handelChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
    console.log(formData);
} 

const calcSemester = (session) =>{
    let year = parseInt(session.substring(2,4))+2000;
     
    let sesh = session.substring(0,2);
    
    let sem = 0;
    if(sesh==="FA"){
        sem =  (new Date().getFullYear() - year)*2;
        
    }else{
        sem =  ((new Date().getFullYear() - year)*2)-1;
    }
     return sem>8?"graduated":sem;
}




const handleSubmit=(e)=>{
    e.preventDefault();
    if(!isTeacher){
        delete formData.email;
        let Registration = session+'-'+program+'-'+roll;
        formData.registration = Registration;
        formData.semester = calcSemester(session); 
    }
    else{
        delete formData.registration;
        delete formData.cgpa;
        delete formData.semester;

    }

    formData.role = isTeacher?'teacher':'student';
   console.log(formData);


    axios.post('http://localhost:80/coursemanager/src/service/Api.php',formData)
      .then((response)=>{
          console.log(response.data);
      })
      .catch((error)=>{
          console.log(error);
      })
      navigation('/login');
}

const loginbtn = {
    float:"left",
    height:"45px",
    margin:"10px",
    color:"black",
    border:"none"

}

    return (
    <div className='App-header'>
        
        <h1 style={headingStyle}>Sign Up</h1>
        <form onSubmit={e=>handleSubmit(e)} autoComplete='off'>
        <label htmlFor="name">Name:
        <input required onChange={e=>handelChange(e)} minLength="3" maxLength='100' type="text" name="name" id="name" placeholder='Full Name' className='rounded' style={inputstyle} /></label>
        <br />
        <label htmlFor="password">Password:
        <input required onChange={e=>handelChange(e)} minLength='8' maxLength="100" type="password" name="password" id="password" className='rounded' placeholder='minumum 8 characters' style={inputstyle} /></label>
        <br />
        <label htmlFor="role">Role:
            <select name="role" id="role" defaultValue={"Student"} onChange={(e)=>{handleRole(e); handelChange(e)}} style={inputstyle} className='rounded'> 
                <option value="teacher" >Teacher</option>
                <option value="Student"  >Student</option>
            </select>
        
        </label>
        <br />
        {isTeacher && <label htmlFor="email">Email:
        <input required onChange={e=>handelChange(e)} type="email" name="email" id="email" placeholder='Email' className='rounded' style={inputstyle} /></label>}
        <br />
        {!isTeacher && sessionsGenerated &&
        (<div >
            <label >Registration number:</label>
            <br />
            <select onChange={e=>setsession(e.target.value)} name="session" id="session"  className='rounded'>
                {sessions.map((item) => <option key={item}  value={item}>{item}</option>)
                }
            </select>
            <select onChange={e=>setprogram(e.target.value)}  name='program' id='program' className='rounded'>
                <option value="BCS">BCS</option>
                <option value="BBA">BBA</option>
                <option value="BSE">BSE</option>
                <option value="BTY">BTY</option>
                <option value="CVE">CVE</option>
            </select>
            <input onChange={e=>setroll(e.target.value.toString())} type="number" name='roll' id='roll' className='rounded' placeholder='000' style={{width:"60px",height:"33px"}}  required/>
            <br />
            <label htmlFor="cgpa">CGPA:</label>
            <input required style={inputstyle} step='any' max='4' min='0.00' type='number' name='cgpa' id='cgpa' className='rounded' onChange={e=>handelChange(e)} ></input>
            <br /> 
            </div>)
            }
        <button className='btn btn-primary m-3'>Submit</button>
        <input type="button" value="Go To Login" onClick={e=>navigation('/login')} className='btn rounded btn-primary'  />

        </form>
    </div>
  )
}
