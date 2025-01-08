import React, { memo, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTrash } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../../Interceptor/axiosInstance';
import useFetch from '../../../../hooks/useFetch';
import { IAdminLobby } from '../../../../Interface/IAdminLobby';
import { ILobby } from '../../../../Interface/ILobby';
import useLobbySocket from '../../../../hooks/useLobbySocket';
import { SocketContext } from '../../../../pages/Main';

interface lobby {
  title: string | undefined | null
  setLobbyId: React.Dispatch<React.SetStateAction<string>>
  clickhandle:(title: string, lobbyId: string, adminId: string, lobbyName: string) => void

}

const AllLobby: React.FC<lobby> = ({ title, setLobbyId,clickhandle}) => {
  const {data:alllobby,setData:setAlllobby} = useFetch<ILobby[]|null>("api/lobby",undefined);
  const {data:adminLobby,setData:setAdminLobby} = useFetch<IAdminLobby[]|null>("api/admin",undefined);
  const socket = useContext(SocketContext)
  useLobbySocket(socket,setAlllobby,setAdminLobby,setLobbyId)
  
   
 async function handleDelete (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.id
    await axiosInstance.delete('api/admin/removelobby/'+id)
      .then(res => {
        socket.emit("delete-lobby", res.data)
      })
      .catch(error=>console.log(error.response.data));
  }
 
  return (
    <div className='all-lobby'>
      {adminLobby?.map(lobby => (
        <div className={title === lobby?.name ? 'active' : 'admin-lobby'} key={lobby?.id} onClick={()=>clickhandle(lobby.name,lobby.id,lobby.admin_id,lobby.name)} id={lobby?.id}>
          <div>
            <p id={lobby.name}>
              {lobby?.name}
            </p>
            <FontAwesomeIcon id={lobby?.admin_id} className='crown' icon={faCrown} />
          </div>
          <button id={lobby?.id} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
        </div>

      ))}
      {alllobby?.map(lobby => (
        <div className={title === lobby?.name ? 'active' : 'lobby'} key={lobby?.lobby_id} onClick={()=>clickhandle(lobby.name,lobby.lobby_id,'0','')} id={lobby?.lobby_id}>
          <div>
          <p>
            {lobby?.name}
          </p>

          </div>
        </div>
      ))}

    </div>
  )
}

export default memo(AllLobby)
