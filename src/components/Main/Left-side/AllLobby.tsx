import React, { useCallback } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';
import { log } from 'console';
interface lobby {
  alllobby: {
    name: string;
    lobby_id: string;
    user_id: string;
  }[] | undefined

  socket: Socket;
  config: {
    headers: {
      Authorization: string;
    };
  };

  setTitle: React.Dispatch<React.SetStateAction<string | null | undefined>>
  adminLobby: {
    id: string;
    name: string;
    admin_id: string;
  }[] | undefined;

  title: string | undefined | null



  setLobbyId: React.Dispatch<React.SetStateAction<string>>
  setAdminId: React.Dispatch<React.SetStateAction<string>>
  setLobbyName: React.Dispatch<React.SetStateAction<string>>

}

const AllLobby: React.FC<lobby> = ({ alllobby, setTitle, adminLobby, title, setLobbyId, setAdminId, config, socket, setLobbyName }) => {



  const clickhandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTitle(e.currentTarget.firstChild?.textContent)
    setLobbyId(e.currentTarget.id)
    setAdminId(e.currentTarget.children[0].children[1].id); 
    setLobbyName(e.currentTarget.children[0].firstChild!.textContent!)
  }
  const clickhandle2 = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTitle(e.currentTarget.firstChild?.textContent)
    setLobbyId(e.currentTarget.id)
    setAdminId('0')
    setLobbyName("");

  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.id
    axios.delete('http://localhost:5000/api/admin/removelobby/' + id, config)
      .then(res => {
        socket.emit("delete-lobby", res.data)
      })
  }

  return (
    <div className='all-lobby'>
      {adminLobby?.map(lobby => (
        <div className={title === lobby?.name ? 'active' : 'admin-lobby'} key={lobby?.id} onClick={clickhandle} id={lobby?.id}>
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
        <div className={title === lobby?.name ? 'active' : 'lobby'} key={lobby?.lobby_id} onClick={clickhandle2} id={lobby?.lobby_id}>
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

export default AllLobby
