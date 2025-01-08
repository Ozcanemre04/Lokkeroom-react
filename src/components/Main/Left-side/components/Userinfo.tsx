import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DisplayContext, SocketContext } from '../../../../pages/Main';

interface Props {
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
    
}
const Userinfo:React.FC<Props> = ({setLogged}) => {
  const socket = useContext(SocketContext)
  const display = useContext(DisplayContext)
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
