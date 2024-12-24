import React, { useState } from 'react'
import axios from 'axios'
interface Props{
  config: {
    headers: {
        Authorization: string;
    }
}
adminLobby: [{
  id: string;
  name: string;
  admin_id: string;
}] | undefined


setAdminLobby: React.Dispatch<React.SetStateAction<[{
  id: string;
  name: string;
  admin_id: string;
}] | undefined>>;
}

const CreateLobby:React.FC<Props> = ({config,setAdminLobby,adminLobby}) => {
const[input,setInput] = useState('')
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
     setInput(e.target.value);
     
  }

  const copy=Object.assign([],adminLobby)
  
  
  
  
  function handleSubmit(){
    
    axios.post('http://localhost:5000/api/admin/newadmin/lobby',{
      name:input
    },config)
    
    .then(res=>copy.push(res.data));
    setAdminLobby(copy)
  }
  
  
  return (
    <div className='form'>
      
        <input type="text" name="" id="" placeholder='write lobby name' onChange={handleChange} />
        <button onClick={handleSubmit} >+</button>
     
    </div>
  )
}

export default CreateLobby
