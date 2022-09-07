import React, { useState } from 'react'
import axios from 'axios'

interface Props{
  LobbyId:string;

  config: {
    headers: {
        Authorization: string;
    };};
allUser: [{
  id: string;
  name: string;
  lobby_id: string;
}] | undefined

setAllUser: React.Dispatch<React.SetStateAction<[{
  id: string;
  name: string;
  lobby_id: string;
}] | undefined>>

adminId:string

display: {
  name: string;
  id: string;
}

setCount: React.Dispatch<React.SetStateAction<number>>
count:number

}
const AddUser:React.FC<Props> = ({LobbyId,config,allUser,setAllUser,adminId,display,setCount,count}) => {
  const[input,setInput] =useState('')

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setInput(e.target.value)
  }

const int = parseInt(LobbyId)
  function onSubmit(){
    
   axios.post('https://lokkeroom.herokuapp.com/api/admin/lobby/'+int+'/add_user',{
    user_id:input
   },config)
   .then(res=>console.log(res.data))
    setCount(count +1)
  }
  
  


  return (
    <>
      {adminId!=='0'&& 
        <div className='form'>
        <input type="number" name="" id="" placeholder='write user id' onChange={handleChange} />
        <button onClick={onSubmit} >create</button>
        </div>
      }
      {adminId==='0'&&
        <div className='erreur1'>
          <h3>
           see all user only for admin

          </h3>
        </div>
}
      </>
  )
}

export default AddUser
