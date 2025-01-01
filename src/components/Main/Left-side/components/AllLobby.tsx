import React, { memo, useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';
import { log } from 'console';
interface lobby {
  socket: Socket;
  config: {
    headers: {
      Authorization: string;
    };
  };

  setTitle: React.Dispatch<React.SetStateAction<string | null | undefined>>
  title: string | undefined | null
  setLobbyId: React.Dispatch<React.SetStateAction<string>>
  setAdminId: React.Dispatch<React.SetStateAction<string>>
  setLobbyName: React.Dispatch<React.SetStateAction<string>>

}

const AllLobby: React.FC<lobby> = ({setTitle, title, setLobbyId, setAdminId, config, socket, setLobbyName }) => {
  const [alllobby, setAlllobby] = useState<{ name: string, lobby_id: string, user_id: string }[]>([])
    const [adminLobby, setAdminLobby] = useState<{ id: string, name: string, admin_id: string }[]>([])


  const clickhandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
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
  const displayAllLobby = () => {
    axios.get('http://localhost:5000/api/lobby', config)
      .then(res => setAlllobby(res.data));

  }
  const displayAdminLobby = () => {
    axios.get('http://localhost:5000/api/admin', config)
      .then(res => setAdminLobby(res.data));
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.id
    axios.delete('http://localhost:5000/api/admin/removelobby/'+id, config)
      .then(res => {
        console.log(res.data);
        
        socket.emit("delete-lobby", res.data)
      })
      .catch(error=>console.log(error.response.data));
  }
  useEffect(() => {
      displayAllLobby()
      displayAdminLobby()
  
    }, []);

  useEffect(() => {
    socket.on("not-admin-lobby", lobby => {
      console.log(lobby);
      setAlllobby((prev) => [...prev, lobby])
    })
    socket.on("not-admin-lobby-deleted", lobby => {
      setAlllobby((prev) => prev.filter(x => x.lobby_id !== lobby))
      setLobbyId("")
    })
      socket.on("receive-lobby", lobby => {
        setAdminLobby((prev) => [...prev, lobby])
      })
      socket.on("lobby-deleted", lobby => {
        setAdminLobby((prev) => prev.filter(x => x.id !== lobby.id))
        setAlllobby((prev) => prev.filter(x => x.lobby_id !== lobby.id))
        setLobbyId("")
      })
     
      return () => {
        socket.off("receive-lobby");
        socket.off("not-admin-lobby");
        socket.off("not-admin-lobby-deleted");
        socket.off("lobby-deleted");
      }
  
    }, [])
  
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

export default memo(AllLobby)
