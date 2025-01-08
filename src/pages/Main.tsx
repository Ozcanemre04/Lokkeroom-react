import React, { createContext, memo, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import Modal from 'react-modal';
import LeftSide from '../components/Main/Left-side/LeftSide';
import MiddleSide from '../components/Main/Middle-side/MiddleSide';
import ModalContainer from '../components/Main/Modal/ModalContainer';
import useFetch from '../hooks/useFetch';
import { IDisplay } from '../Interface/IDisplay';

interface Props {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

let socket = io('http://localhost:5000');
export const SocketContext = createContext<Socket>(socket);
export const DisplayContext = createContext<IDisplay|null>(null);
export const LobbyIdContext = createContext<string>('');
export const AdminIdContext = createContext<string>('');

const Main: React.FC<Props> = ({ setLogged }) => {
  const [title, setTitle] = useState<string | undefined | null>('')
  const [LobbyId, setLobbyId] = useState('')
  const [LobbyName, setLobbyName] = useState<string>('')
  const [adminId, setAdminId] = useState('')
  const [isShown, setIsShown] = useState(false)
  const [onlineUser, setOnlineUser] = useState<{ userId: string, socket: string }[]>([])
  const {data:display} = useFetch<IDisplay>('api/user',undefined);
  
  const clickhandle = (title:string,lobbyId:string,adminId:string,lobbyName:string) => { 
    setTitle(title)
    setLobbyId(lobbyId)
    setAdminId(adminId); 
    setLobbyName(lobbyName) 
  }
  
  useEffect(() => {
    if (display?.id !== '') {
      socket.emit("connected-user", display?.id)
      socket.on("all-connected-user", users => {
        setOnlineUser(users);
      })
    }
    return () => {
      socket.off("all-connected-user");
    }
  }, [display?.id])

  useEffect(() => {
    socket.on("disconneted-user", users => {
      setOnlineUser(users)
    })
    return () => {
      socket.off("disconneted-user");
    }
  }, [])

 
  return (
    <DisplayContext.Provider value={display}>
    <SocketContext.Provider value={socket}>
       <main className='main'>
         <section className='left-side'>
        <LeftSide  setLogged={setLogged} title={title} setLobbyId={setLobbyId} clickhandle={clickhandle} />
      </section>
      <LobbyIdContext.Provider value={LobbyId}>
      <AdminIdContext.Provider value={adminId}>

      {
        LobbyId !== '' ?
        <section className='middle-side'>
            <MiddleSide title={title} setIsShown={setIsShown} />
          </section> : <section className='middle-side'></section>
      }
      <Modal isOpen={isShown} ariaHideApp={false} className='modal'>
        <ModalContainer LobbyName={LobbyName} setIsShown={setIsShown} onlineUser={onlineUser} />
      </Modal>
      </AdminIdContext.Provider>
      </LobbyIdContext.Provider>
    </main>
   </SocketContext.Provider>
   </DisplayContext.Provider>
  )
}

export default memo(Main)
