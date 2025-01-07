import React, { memo, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
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

const Main: React.FC<Props> = ({ setLogged }) => {
  const [title, setTitle] = useState<string | undefined | null>('')
  const [LobbyId, setLobbyId] = useState('')
  const [LobbyName, setLobbyName] = useState<string>('')
  const [adminId, setAdminId] = useState('')
  const [isShown, setIsShown] = useState(false)
  const [onlineUser, setOnlineUser] = useState<{ userId: string, socket: string }[]>([])
  const {data:display} = useFetch<IDisplay>('api/user',undefined);

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
    <main className='main'>
      <section className='left-side'>
        <LeftSide display={display} setLogged={setLogged} socket={socket}
        setTitle={setTitle} title={title} setLobbyId={setLobbyId}
        setAdminId={setAdminId} setLobbyName={setLobbyName} />
      </section>
      {
        LobbyId !== '' ?
          <section className='middle-side'>
            <MiddleSide display={display} LobbyId={LobbyId} adminId={adminId} socket={socket} title={title} setIsShown={setIsShown} />
          </section> : <section className='middle-side'></section>
      }

      <Modal isOpen={isShown} ariaHideApp={false} className='modal'>
        <ModalContainer LobbyId={LobbyId} adminId={adminId} display={display}
          socket={socket} LobbyName={LobbyName} setIsShown={setIsShown} onlineUser={onlineUser} />
      </Modal>
    </main>
  )
}

export default memo(Main)
