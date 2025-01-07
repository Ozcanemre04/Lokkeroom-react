import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface Props {
    display: {name: string;id: string}|null
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
    socket:Socket
}
const Userinfo:React.FC<Props> = ({setLogged,display,socket}) => {
    function handleLogout(){
        socket.emit("disc",display?.id)
        window.localStorage.clear()
        setLogged(false)
      }
  return (
    <div className='left-header'>
      <h1>{display?.name}</h1>
      <Link to={'/'}>
      <button onClick={handleLogout}>logout</button>
      </Link>
      </div>
  )
}

export default memo(Userinfo)
