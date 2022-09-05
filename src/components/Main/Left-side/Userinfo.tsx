import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    display: {name: string;id: string}
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
}
const Userinfo:React.FC<Props> = ({setLogged,display}) => {
    function handleLogout(){
        window.localStorage.clear()
        setLogged(false)
      }
  return (
    <div className='left-header'>
      <h1>{display?.name}</h1>
      <p>your id:{display?.id}</p>
      <Link to={'/'}>
      <button onClick={handleLogout}>logout</button>
      </Link>
      </div>
  )
}

export default Userinfo
