import React, { memo, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import Userinfo from '../components/Main/Left-side/Userinfo';
import CreateLobby from '../components/Main/Left-side/CreateLobby';
import AllLobby from '../components/Main/Left-side/AllLobby';
import Messages from '../components/Main/Middle-side/Messages';
import MiddleTitle from '../components/Main/Middle-side/MiddleTitle';
import Sendmessage from '../components/Main/Middle-side/Sendmessage';
import AddUser from '../components/Main/Right-side/AddUser';
import AllUser from '../components/Main/Right-side/AllUser';
import { io, Socket } from 'socket.io-client';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow, faUserXmark, faX } from '@fortawesome/free-solid-svg-icons';


interface Props {
  display: { name: string; id: string; }
  setDisplay: React.Dispatch<React.SetStateAction<{ name: string; id: string; }>>
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
  token: string;
}



let socket = io('http://localhost:5000');

const Main: React.FC<Props> = ({ display, setDisplay, token, setLogged }) => {
  const tokken = JSON.parse(localStorage.getItem('token') || '{}')
  const config = {
    headers: { Authorization: `Bearer ${tokken}` }
  };
  const [alllobby, setAlllobby] = useState<{ name: string, lobby_id: string, user_id: string }[]>([])
  const [messages, setMessages] = useState<{ message: string, lobby_id: string, id: string, author_id: string, name: string }[]>([])
  const [title, setTitle] = useState<string | undefined | null>('')
  const [adminLobby, setAdminLobby] = useState<{ id: string, name: string, admin_id: string }[]>([])
  const [allUser, setAllUser] = useState<{ id: string, name: string, lobby_id: string }[]>([])
  const [LobbyId, setLobbyId] = useState('')
  const [LobbyName, setLobbyName] = useState<string>('')
  const [adminId, setAdminId] = useState('')
  const [isShown, setIsShown] = useState(false)
  const [onlineUser, setOnlineUser] = useState<{ userId: string, socket: string }[]>([])

  function displayDisplauy() {
    axios.get('http://localhost:5000/api/user', config)
      .then(res => setDisplay(res.data));
  }

  const displayAllLobby = () => {
    axios.get('http://localhost:5000/api/lobby', config)
      .then(res => setAlllobby(res.data));

  }
  const displayAdminLobby = () => {
    axios.get('http://localhost:5000/api/admin', config)
      .then(res => setAdminLobby(res.data));

  }
  const displayMessage = () => {
    axios.get('http://localhost:5000/api/lobby/' + LobbyId + '?page=1&limit=10000000000000', config)
      .then(res => setMessages(res.data.result))
  }

  const displayAlluser = () => {
    axios.get('http://localhost:5000/api/admin/users/' + LobbyId, config)
      .then(res => setAllUser(res.data))

  }

  //useEffect
  useEffect(() => {
    displayDisplauy()
    displayAllLobby()
    displayAdminLobby()

  }, []);

  useEffect(() => {
    if (adminId !== '') {
      displayAlluser()
    }
  }, [LobbyId])
  
  useEffect(() => {
    if (display.id !== '') {
      socket.emit("connected-user", display.id)
      socket.on("all-connected-user", user => {
        setOnlineUser(user);
      })
    }
  }, [display])

  useEffect(() => {
    socket.on("disconneted-user", users => {
      setOnlineUser(users)
    })
    return () => {
      socket.off("disconneted-user");
    }
  }, [display, onlineUser])

  useEffect(() => {
    if (LobbyId) {
      socket.emit('join-room', LobbyId)
    }
    displayMessage()
    socket.off("receive-message").on("receive-message", msg => {
      if (msg.lobby_id === LobbyId) {
        setMessages((prev) => [...prev, msg])
      }
    })
  }, [LobbyId])


  useEffect(() => {
    socket.on("receive-lobby", lobby => {
      setAdminLobby((prev) => [...prev, lobby])
    })
    socket.on("not-admin-lobby", lobby => {
      setAlllobby((prev) => [...prev, lobby])
    })
    socket.on("lobby-deleted", lobby => {
      setAdminLobby((prev) => prev.filter(x => x.id !== lobby.id))
      setAlllobby((prev) => prev.filter(x => x.lobby_id !== lobby.id))
      setLobbyId("")
    })
    socket.on("not-admin-lobby-deleted", lobby => {
      setAlllobby((prev) => prev.filter(x => x.lobby_id !== lobby))
      setLobbyId("")
    })
    socket.on("user-added", user => {
      setAllUser((prev) => [...prev, user])
    })
    socket.on("user-deleted", user => {
      setAllUser((prev) => prev.filter(x => x.id !== user))
    })

    socket.on("deleted-message", deletedMsg => {
      setMessages((prev) => prev.filter(x => x.id !== deletedMsg.id));
    })
    socket.on("updated-message", (updatedMsg: { message: string, author_id: string, name: string, id: string, lobby_id: string }) => {
      setMessages((prev) => prev.map((item) => item.id === updatedMsg.id ? { ...item, message: updatedMsg.message } : item));

    })
    return () => {
      socket.off("receive-lobby");
      socket.off("lobby-deleted");
      socket.off("deleted-message");
      socket.off("updated-message");
      socket.off("user-added");
      socket.off("user-deleted");
      socket.off("not-admin-lobby");
      socket.off("not-admin-lobby-deleted");
    }

  }, [])





  return (
    <main className='main'>

      <section className='left-side'>
        <Userinfo display={display} setLogged={setLogged} socket={socket} />
        <CreateLobby config={config} socket={socket} />
        <AllLobby alllobby={alllobby} setTitle={setTitle} adminLobby={adminLobby} title={title} setLobbyId={setLobbyId} setAdminId={setAdminId} config={config} socket={socket} setLobbyName={setLobbyName} />

      </section>
      {
        LobbyId !== '' &&
        <section className='middle-side'>
          <MiddleTitle title={title} setIsShown={setIsShown} display={display} adminId={adminId} />
          <Messages messages={messages} display={display} config={config} LobbyId={LobbyId} adminId={adminId} socket={socket} setMessages={setMessages} />
          <Sendmessage config={config} LobbyId={LobbyId} setMessages={setMessages} messages={messages} socket={socket} display={display} />
        </section>
      }
      {
        LobbyId === '' &&
        <section className='middle-side'></section>
      }
      <Modal isOpen={isShown} ariaHideApp={false} className='modal'>
        <button>
          <FontAwesomeIcon className='x' onClick={() => { setIsShown(false) }} icon={faX} />
        </button>
        <section className='right-side'>
          < AddUser LobbyId={LobbyId} config={config} adminId={adminId} socket={socket} LobbyName={LobbyName} />
          < AllUser allUser={allUser} config={config} LobbyId={LobbyId} adminId={adminId} display={display} socket={socket} onlineUser={onlineUser} />
        </section>
      </Modal>
    </main>
  )
}

export default memo(Main)
