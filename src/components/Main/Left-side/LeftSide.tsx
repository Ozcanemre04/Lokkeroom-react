import React, { memo } from 'react'
import { Socket } from 'socket.io-client';
import CreateLobby from './components/CreateLobby';
import Userinfo from './components/Userinfo';
import AllLobby from './components/AllLobby';
import { IDisplay } from '../../../Interface/IDisplay';

interface leftSide{
  socket: Socket;
  setTitle: React.Dispatch<React.SetStateAction<string | null | undefined>>
  title: string | undefined | null
  setLobbyId: React.Dispatch<React.SetStateAction<string>>
  setAdminId: React.Dispatch<React.SetStateAction<string>>
  setLobbyName: React.Dispatch<React.SetStateAction<string>>
  display: IDisplay|null;
  setLogged:React.Dispatch<React.SetStateAction<boolean>>
 
}

const LeftSide:React.FC<leftSide> = ({display,setLobbyId,setAdminId,setLobbyName,title,socket,setLogged,setTitle}) => {
  return (
    <>
        <Userinfo display={display} setLogged={setLogged} socket={socket} />
        <CreateLobby socket={socket} />
        <AllLobby  setTitle={setTitle}  title={title} setLobbyId={setLobbyId} setAdminId={setAdminId} socket={socket} setLobbyName={setLobbyName} />
    </>
  )
}

export default memo(LeftSide)