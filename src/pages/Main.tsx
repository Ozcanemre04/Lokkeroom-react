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
import { io } from 'socket.io-client';
import  Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow, faX } from '@fortawesome/free-solid-svg-icons';


interface Props{
  display: {name: string;id: string;}
  setDisplay: React.Dispatch<React.SetStateAction<{name: string;id: string;}>>
  setLogged:React.Dispatch<React.SetStateAction<boolean>>
  token:string
}



let socket = io('http://localhost:5000');

const Main:React.FC<Props> = ({display,setDisplay,token,setLogged}) => {
  const tokken = JSON.parse(localStorage.getItem('token')|| '{}')
  const config = {
    headers: { Authorization: `Bearer ${tokken}` }
  };
  const[alllobby,setAlllobby] = useState<[{name:string,lobby_id:string,user_id:string}]>()
  const[messages,setMessages] =useState<{message:string,lobby_id:string,id:string,author_id:string,name:string}[]>([])
  const[title,setTitle] = useState<string|undefined|null>('')
  const[adminLobby,setAdminLobby] = useState<[{id:string,name:string,admin_id:string}]>()
  const[allUser,setAllUser] =useState<[{id:string,name:string,lobby_id:string}]>()
  const[LobbyId,setLobbyId] =useState('')
  const[adminId,setAdminId] = useState('')
  const[isShown,setIsShown] = useState(false)
  function displayDisplauy(){
    axios.get('http://localhost:5000/api/user',config)  
    .then(res=>setDisplay(res.data));
  }
  
  const displayAllLobby= ()=>{
    axios.get('http://localhost:5000/api/lobby',config)
    .then(res=>setAlllobby(res.data));
    
  }
  const displayAdminLobby=()=>{
    axios.get('http://localhost:5000/api/admin',config)
    .then(res=>setAdminLobby(res.data));
    
  }
  const displayMessage=()=>{
    axios.get('http://localhost:5000/api/lobby/'+ LobbyId +'?page=1&limit=10000000000000',config)
    .then(res=> 
      {
        setMessages(res.data.result) 
    }
      
      )  
    }
    
    const displayAlluser=()=>{
      axios.get('http://localhost:5000/api/admin/users/'+LobbyId ,config)
      .then(res=>setAllUser(res.data))
      
    }
    //useEffect
    useEffect(()=>{
      displayDisplauy()
      displayAllLobby()
    },[]);
    

useEffect(()=>{
  if(LobbyId){
    socket.emit('join-room',LobbyId)
  }
  
},[LobbyId])

useEffect(()=>{
  displayAdminLobby()
},[])


useEffect(()=>{
  displayMessage()
  socket.off("receive-message").on("receive-message",msg=>{
    if(msg.lobby_id===LobbyId){
      setMessages((prev)=>[...prev,msg])

    }
  })  
},[LobbyId])



useEffect(()=>{
  socket.off("deleted-message").on("deleted-message",deletedMsg=>{ 
    setMessages(messages.filter(x=>x.id!==deletedMsg.id));
   })
   socket.off("updated-message").on("updated-message",updatedMsg=>{
     const updatedMessage = [...messages];
     let find = updatedMessage.find(
       a => a.id === updatedMsg.id
     );
     find!.message = updatedMsg.message;
     setMessages(updatedMessage);
     
   
  })
  },[messages])

  



useEffect(()=>{
  if(adminId!==''){
    displayAlluser()
  }
    
  },[title])

     
  return (
    <main className='main'>
   
    <section className='left-side'>
      <Userinfo display={display} setLogged={setLogged} />
      <CreateLobby config={config} adminLobby={adminLobby} setAdminLobby={setAdminLobby} />
      <AllLobby alllobby={alllobby}  setTitle={setTitle} adminLobby={adminLobby} title={title}  setLobbyId={setLobbyId} setAdminId={setAdminId} config={config}  />
      
    </section>
    {
      LobbyId!==''&&
      <section className='middle-side'>
       <MiddleTitle title={title} setIsShown={setIsShown} display={display} adminId={adminId}/>
       <Messages messages={messages} display={display} config={config}  LobbyId={LobbyId} adminId={adminId} socket={socket} setMessages={setMessages} />
       <Sendmessage config={config} LobbyId={LobbyId} setMessages={setMessages} messages={messages} socket={socket} display = {display} />
      </section>
    }
    {
      LobbyId===''&&
      <section className='middle-side'></section>
    }
       <Modal isOpen={isShown}  ariaHideApp={false} className='modal'>
        <button>
         <FontAwesomeIcon className='x' onClick={()=>{setIsShown(false)}} icon={ faX} />
        </button>
       <section className='right-side'>
       < AddUser LobbyId={LobbyId} config={config} allUser={allUser} setAllUser={setAllUser} adminId={adminId} display={display} />
       < AllUser allUser={allUser} config={config} LobbyId={LobbyId} setAllUser={setAllUser} adminId={adminId} display={display} />
      </section>
    </Modal>
    </main>
  )
}

export default memo(Main)
