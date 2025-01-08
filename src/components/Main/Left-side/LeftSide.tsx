import React, { memo } from 'react'
import CreateLobby from './components/CreateLobby';
import Userinfo from './components/Userinfo';
import AllLobby from './components/AllLobby';


interface leftSide{
  setLobbyId: React.Dispatch<React.SetStateAction<string>>
  title: string | undefined | null
  setLogged:React.Dispatch<React.SetStateAction<boolean>>
  clickhandle: (title: string, lobbyId: string, adminId: string, lobbyName: string) => void

}

const LeftSide:React.FC<leftSide> = ({setLobbyId,title,setLogged,clickhandle}) => {
  return (
    <>
        <Userinfo setLogged={setLogged} />
        <CreateLobby />
        <AllLobby title={title} setLobbyId={setLobbyId} clickhandle={clickhandle} />
    </>
  )
}

export default memo(LeftSide)