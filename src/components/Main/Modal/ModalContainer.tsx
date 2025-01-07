import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'
import { Socket } from 'socket.io-client';
import AllUser from './components/AllUser';
import AddUser from './components/AddUser';
import { IDisplay } from '../../../Interface/IDisplay';

export interface IModalContainer{
  display: IDisplay|null 
  LobbyId:string;
  adminId:string;
  socket: Socket;
  LobbyName:string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  onlineUser: {
    userId: string,
    socket: string
  }[]
}

const ModalContainer:React.FC<IModalContainer> = ({setIsShown,LobbyId,adminId,display,socket,LobbyName,onlineUser}) => {
  return (
    <>
        <button>
          <FontAwesomeIcon className='x' onClick={() => { setIsShown(false) }} icon={faX} />
        </button>
        <section className='right-side'>
          < AddUser LobbyId={LobbyId} adminId={adminId} socket={socket} LobbyName={LobbyName} />
          < AllUser LobbyId={LobbyId} adminId={adminId} display={display} socket={socket} onlineUser={onlineUser} />
        </section>
    </>
  )
}

export default memo(ModalContainer)