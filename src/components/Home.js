import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { tab } from '@testing-library/user-event/dist/tab';
export default function Home(props) {
    const tablestyle ={
        border:"5px",
        borderStyle:"solid",
        borderColor:"black",
        width:"100%",
        height:"100vh"

    }
    
    const [data,setdata] = useState([]);
   

    const renderStudent = () =>{

       axios.get('http://localhost:80/coursemanager/src/service/GetStudent.php?id=' + props.id)
  .then(response => {
    console.log(response.data);
  });

  return (<table style={tablestyle}> 
    <tr>
        <th>Course ID</th>
        <th>Couse Name</th>
        <th>Credit Hours</th>
        <th>Department</th>
        <th>Class</th>
    </tr>
</table>);
    } 

    const renderTeacher = ()=>{
        return (<table style={tablestyle}> 
            <tr>
                <th>Course ID</th>
                <th>Couse Name</th>
                <th>Credit Hours</th>
                <th>Department</th>
                <th>Class</th>
            </tr>
        </table>);
    }

  return (
    <div className='App-header'>

        {(props.role === 'student') &&
            renderStudent()
        }
        {(props.role === 'teacher') &&  
             renderTeacher()
        }
       
        {/* <table className='rounded' style={tablestyle}>
            <tr  key={-1}>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            

            
        </table> */}
      
    </div>
  )
}
