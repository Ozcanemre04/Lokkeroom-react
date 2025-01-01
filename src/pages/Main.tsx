import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client';
import Modal from 'react-modal';
import LeftSide from '../components/Main/Left-side/LeftSide';
import MiddleSide from '../components/Main/Middle-side/MiddleSide';
import ModalContainer from '../components/Main/Modal/ModalContainer';
import { log } from 'console';


interface Props {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>

}

//I should add axios interceptor
let socket = io('http://localhost:5000');

const Main: React.FC<Props> = ({ setLogged }) => {
  const tokken = JSON.parse(localStorage.getItem('token') || '{}')
  const config = {
    headers: { Authorization: `Bearer ${tokken}` }
  };
  const [display, setDisplay] = useState({ 'name': '', 'id': '' })
  const [title, setTitle] = useState<string | undefined | null>('')
  const [LobbyId, setLobbyId] = useState('')
  const [LobbyName, setLobbyName] = useState<string>('')
  const [adminId, setAdminId] = useState('')
  const [isShown, setIsShown] = useState(false)
  const [onlineUser, setOnlineUser] = useState<{ userId: string, socket: string }[]>([])
  function displayDisplauy() {
    axios.get('http://localhost:5000/api/user', config)
      .then(res => setDisplay(res.data));
  }

  //useEffect
  useEffect(() => {
    displayDisplauy()
  }, []);

  useEffect(() => {
    if (display.id !== '') {
      socket.emit("connected-user", display.id)
      socket.on("all-connected-user", users => {
        console.log(users);

        setOnlineUser(users);
      })
    }
    return () => {
      socket.off("all-connected-user");
    }
  }, [display.id])

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
        <LeftSide display={display} setLogged={setLogged} socket={socket} config={config}
          setTitle={setTitle} title={title} setLobbyId={setLobbyId}
          setAdminId={setAdminId} setLobbyName={setLobbyName} />
      </section>
      {
        LobbyId !== '' ?
          <section className='middle-side'>
            <MiddleSide display={display} config={config} LobbyId={LobbyId} adminId={adminId} socket={socket} title={title} setIsShown={setIsShown} />
          </section> : <section className='middle-side'></section>
      }

      <Modal isOpen={isShown} ariaHideApp={false} className='modal'>
        <ModalContainer config={config} LobbyId={LobbyId} adminId={adminId} display={display}
          socket={socket} LobbyName={LobbyName} setIsShown={setIsShown} onlineUser={onlineUser} />
      </Modal>
    </main>
  )
}

export default memo(Main)
