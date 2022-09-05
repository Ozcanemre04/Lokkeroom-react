import React from 'react';

interface lobby{
   alllobby: [{
    name: string;
    lobby_id:string;
    user_id:string;
}] | undefined




setTitle: React.Dispatch<React.SetStateAction<string|null|undefined>>
adminLobby: [{
  id: string;
  name: string;
  admin_id: string;
}] | undefined;

title: string|undefined|null



setLobbyId: React.Dispatch<React.SetStateAction<string>>
setAdminId: React.Dispatch<React.SetStateAction<string>>

}

const AllLobby:React.FC<lobby> = ({alllobby,setTitle,adminLobby,title,setLobbyId,setAdminId}) => {



const clickhandle=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
setTitle(e.currentTarget.firstChild?.textContent)
setLobbyId(e.currentTarget.id)
setAdminId(e.currentTarget.children[1].id);


}
const clickhandle2=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
  setTitle(e.currentTarget.firstChild?.textContent)
  setLobbyId(e.currentTarget.id)
  setAdminId('0')
  
}

  return (
    <div className='all-lobby'>
      {adminLobby?.map(lobby=>(
        <div className={title===lobby?.name?'active':'admin-lobby'}  key={lobby?.id} onClick={clickhandle} id={lobby?.id}>
          <p>
          {lobby?.name}
          </p>
          <p className='hide' id={lobby?.admin_id}>you're admin</p>
          </div>
          
      ))}
      {alllobby?.map(lobby=>(
        <div className={title===lobby?.name?'active':'lobby'} key={lobby?.lobby_id} onClick={clickhandle2} id={lobby?.lobby_id}>
          
          {lobby?.name}
        </div>
        ))}

    </div>
  )
}

export default AllLobby
