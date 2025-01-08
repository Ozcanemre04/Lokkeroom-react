import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'
import AllUser from './components/AllUser';
import AddUser from './components/AddUser';


export interface IModalContainer{
  LobbyName:string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  onlineUser: {
    userId: string,
    socket: string
  }[]
}

const ModalContainer:React.FC<IModalContainer> = ({setIsShown,LobbyName,onlineUser}) => {
  return (
    <>
        <button>
          <FontAwesomeIcon className='x' onClick={() => { setIsShown(false) }} icon={faX} />
        </button>
        <section className='right-side'>
          < AddUser LobbyName={LobbyName} />
          < AllUser onlineUser={onlineUser} />
        </section>
    </>
  )
}

export default memo(ModalContainer)