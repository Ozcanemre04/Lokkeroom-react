import React, { memo,} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';
import axiosInstance from '../../../../Interceptor/axiosInstance';
import useFetch from '../../../../hooks/useFetch';
import useUserSocket from '../../../../hooks/useUserSocket';
import { IUser } from '../../../../Interface/IUser';
import { IDisplay } from '../../../../Interface/IDisplay';

interface Props {
  onlineUser: {
    userId: string,
    socket: string
  }[]
  LobbyId: string;
  adminId: string
  display: IDisplay|null
  socket: Socket

}
const AllUser: React.FC<Props> = ({LobbyId, adminId, display, socket, onlineUser }) => {
  const {data:allUser,setData:setAllUser} = useFetch<IUser[]|null>("api/admin/users/"+ LobbyId,undefined);
  useUserSocket(socket,setAllUser);
 
  async function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
   await axiosInstance.delete('api/admin/lobby/' + LobbyId + '/remove_user/' + e.currentTarget.id)
      .then(res => socket.emit("delete-user", res.data))
  }

  return (
    <>
      <section className='all-user'>
        {adminId === display?.id &&

          allUser?.map(user => (
            <div className='each-user' key={user?.id} id={user?.id}>
              <span className={onlineUser.find(x => x.userId === user.id) ? "active" : ''}><FontAwesomeIcon className='circle' icon={faCircle} /></span>
              <p>{user?.name}</p>
              <button onClick={handleClick} id={user?.id}>< FontAwesomeIcon icon={faTrash} /></button>
            </div>
          ))
        }
      </section>
    </>
  )
}

export default memo(AllUser)
