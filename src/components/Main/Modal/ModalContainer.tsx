import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'
import { Socket } from 'socket.io-client';
import AllUser from './components/AllUser';
import AddUser from './components/AddUser';

export interface IModalContainer{
    display: {
        name: string;
        id: string;
    }
    config: {
      headers: {
          Authorization: string;
      };
  }
  LobbyId:string;
  adminId:string;
  socket: Socket;
  LobbyName:string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>

//   allUser: {
//     id: string;
//     name: string;
//     lobby_id: string;
// }[]
onlineUser: {
  userId: string,
   socket: string
}[]
}

const ModalContainer:React.FC<IModalContainer> = ({setIsShown,LobbyId,adminId,config,display,socket,LobbyName,onlineUser}) => {
  return (
    <>
        <button>
          <FontAwesomeIcon className='x' onClick={() => { setIsShown(false) }} icon={faX} />
        </button>
        <section className='right-side'>
          < AddUser LobbyId={LobbyId} config={config} adminId={adminId} socket={socket} LobbyName={LobbyName} />
          < AllUser config={config} LobbyId={LobbyId} adminId={adminId} display={display} socket={socket} onlineUser={onlineUser} />
        </section>
    </>
  )
}

export default memo(ModalContainer)