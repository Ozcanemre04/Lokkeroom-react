import React from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props{
    allUser: [{
        id: string;
        name: string;
        lobby_id: string;
    }] | undefined

    config: {
      headers: {
          Authorization: string;
      };};
      LobbyId:string;


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

}

const AllUser:React.FC<Props> = ({allUser,setAllUser,config,LobbyId,adminId,display}) => {

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
       axios.delete('http://localhost:5000/api/admin/lobby/'+LobbyId+'/remove_user/'+e.currentTarget.id,config)
       .then(res=>console.log(res.data))
    }
    
  return (
    <>
    <section className='all-user'>
    {adminId===display.id&&

       allUser?.map(user=>(
        <div className='each-user' key={user?.id} id={user?.id}>
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
