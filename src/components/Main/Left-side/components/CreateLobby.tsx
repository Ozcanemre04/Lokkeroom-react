import React, { memo, useContext, useState } from 'react'
import axiosInstance from '../../../../Interceptor/axiosInstance';
import { SocketContext } from '../../../../pages/Main';


const CreateLobby:React.FC = () => {
const[input,setInput] = useState('')
const[error,setError] = useState('')
const socket = useContext(SocketContext)

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
     setInput(e.target.value);
     setError("")
  }

  async function handleSubmit(){
   await axiosInstance.post('api/admin/newadmin/lobby',{
      name:input
    })
    .then(res=>{
      if(res.data !=="group name taken"){
        socket.emit("create-lobby",res.data)
      }
      else{
        setError(res.data)
      }
      setInput("")
    });
  }
  
  
  return (
    <>
    <div className='form'>
        <input type="text" name="" id="" placeholder='write lobby name' onChange={handleChange} value={input} />
        <button onClick={handleSubmit} disabled={!input} >+</button>
    </div>
    <p style={{color:"red",paddingLeft:"5px"}}>{error}</p>
    </>
  )
}

export default memo(CreateLobby)
