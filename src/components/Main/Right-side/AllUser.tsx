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
  setCount: React.Dispatch<React.SetStateAction<number>>
  count:number
}

const AllUser:React.FC<Props> = ({allUser,setAllUser,config,LobbyId,adminId,display,setCount,count}) => {

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
       axios.delete('https://lokkeroom.herokuapp.com/api/admin/lobby/'+LobbyId+'/remove_user/'+e.currentTarget.id,config)
       .then(res=>console.log(res.data))
       setCount(count + 1)
  
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
      {adminId ==="0"&&
      <div className='erreur2'>
        <h4>
        you are not admin

        </h4>
        </div>
      }
       </section>
       </>
  )
}

export default AllUser
