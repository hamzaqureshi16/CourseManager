import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
export default function Home(props) {
    const tablestyle ={
        border:"5px",
        borderStyle:"solid",
        borderColor:"black",
        width:"100%",
        height:"100vh"

    }
    
    let data = [];
   

    const renderStudent =  () =>{

       axios.get('http://localhost:80/coursemanager/src/service/GetStudent.php?id=' + props.id)
  .then(response => {
    if(response.data.status === 'ok'){
        delete response.data.status;
        
        for(let i = 0; i < Object.keys(response.data).length; i++){
            data.push(response.data[i]);
        }

    }
  });

  return (<table style={tablestyle}> 
    <tbody>
    <tr>
        <th>Course ID{props.role}</th>
        <th>Couse Name</th>
        <th>Credit Hours</th>
        <th>Department</th>
        <th>Class</th>
    </tr>
    {data.map((item) => (
        <tr>
            {console.log(item)}
            <td>{item.c_id}</td>
            <td>{item.c_name}</td>
            <td>{item.c_hours}</td>
            <td>{item.department}</td>
            <td>{item.class}</td>
        </tr>
    ))}

    </tbody>


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
