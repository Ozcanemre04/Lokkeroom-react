import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';
import { stringify } from 'querystring';
import { log } from 'console';

interface Props{
    allUser: {
        id: string;
        name: string;
        lobby_id: string;
    }[]

    config: {
      headers: {
          Authorization: string;
      };};
      LobbyId:string;

    adminId:string

    display: {
      name: string;
      id: string;
  }
socket:Socket
onlineUser:{userId:string,socket:string}[]
}

const AllUser:React.FC<Props> = ({allUser,config,LobbyId,adminId,display,socket,onlineUser}) => {

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
       axios.delete('http://localhost:5000/api/admin/lobby/'+LobbyId+'/remove_user/'+e.currentTarget.id,config)
       .then(res=>socket.emit("delete-user",res.data))
    }
    
   
    
  return (
    <>
    <section className='all-user'>
    {adminId===display.id&&

       allUser?.map(user=>(
        <div className='each-user' key={user?.id} id={user?.id}>
           <span className={onlineUser.find(x=>x.userId===user.id)?"active":''}><FontAwesomeIcon className='circle' icon={faCircle}/></span>
            <p>{ user?.name }</p>
            <button onClick={handleClick} id={user?.id}>< FontAwesomeIcon icon={faTrash}/></button>
        </div>
       ))  
      }
       </section>
       </>
  )
}

export default AllUser
