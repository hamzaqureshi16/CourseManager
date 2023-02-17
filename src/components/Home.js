import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
export default function Home() {
    const tablestyle ={
        border:"5px",
        borderStyle:"solid",
        borderColor:"black",
        width:"100%",
        height:"100vh"

    }
    
    const [data,setdata] = useState([]);
    useEffect(() => {
        getData();
    }, [])

    const getData = async () =>{
        const response = await axios.get('http://localhost:80/coursemanager/src/service/Api.php');
        setdata(response.data);
    } 

  return (
    <div className='App-header'>
        <table className='rounded' style={tablestyle}>
            <tr  key={-1}>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                </tr>
            ))}

            
        </table>
      
    </div>
  )
}
