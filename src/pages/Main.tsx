import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import Userinfo from '../components/Main/Left-side/Userinfo';
import CreateLobby from '../components/Main/Left-side/CreateLobby';
import AllLobby from '../components/Main/Left-side/AllLobby';
import Messages from '../components/Main/Middle-side/Messages';
import MiddleTitle from '../components/Main/Middle-side/MiddleTitle';
import Sendmessage from '../components/Main/Middle-side/Sendmessage';
import AddUser from '../components/Main/Right-side/AddUser';
import AllUser from '../components/Main/Right-side/AllUser';

interface Props{
  display: {name: string;id: string;}
  setDisplay: React.Dispatch<React.SetStateAction<{name: string;id: string;}>>
  setLogged:React.Dispatch<React.SetStateAction<boolean>>
  token:string
}



const Main:React.FC<Props> = ({display,setDisplay,token,setLogged}) => {
  const tokken = JSON.parse(localStorage.getItem('token')|| '{}')
  const config = {
    headers: { Authorization: `Bearer ${tokken}` }
  };
  const[alllobby,setAlllobby] = useState<[{name:string,lobby_id:string,user_id:string}]>()
  const[messages,setMessages] =useState<[{message:string,name:string,id:string,author_id:string}]>()
  const[title,setTitle] = useState<string|undefined|null>('')
  const[adminLobby,setAdminLobby] = useState<[{id:string,name:string,admin_id:string}]>()
  const[allUser,setAllUser] =useState<[{id:string,name:string,lobby_id:string}]>()
  const[LobbyId,setLobbyId] =useState('')
  const[adminId,setAdminId] = useState('')
  const[count,setCount] = useState(0)
  const[messageCount,setMessageCount] = useState(0)
  const[lobbyCount,setLobbyCount] = useState(0)
  
 function displayDisplauy(){
  axios.get('https://lokkeroom.herokuapp.com/api/user',config)
  .then(res=>setDisplay(res.data));
 }
 
 const displayAllLobby= ()=>{
   axios.get('https://lokkeroom.herokuapp.com/api/lobby',config)
   .then(res=>setAlllobby(res.data));

  }
  const displayAdminLobby=()=>{
    axios.get('https://lokkeroom.herokuapp.com/api/admin',config)
    .then(res=>setAdminLobby(res.data));
  
  }
  const displayMessage=()=>{
    axios.get('https://lokkeroom.herokuapp.com/api/lobby/'+ LobbyId +'?page=1&limit=100000',config)
      .then(res=>setMessages(res.data.result))
  }
  console.log(messages);
  
  const displayAlluser=()=>{
    axios.get('https://lokkeroom.herokuapp.com/api/admin/users/'+LobbyId ,config)
      .then(res=>setAllUser(res.data))
  }
//useEffect
useEffect(()=>{
 displayDisplauy()
 displayAllLobby() 
},[]);


useEffect(()=>{
  displayAdminLobby()
},[lobbyCount])


useEffect(()=>{
  displayMessage()
},[title,messageCount])



useEffect(()=>{
  displayAlluser()
    
  },[title,count])

     
  return (
    <main className='main'>
   
    <section className='left-side'>
      <Userinfo display={display} setLogged={setLogged} />
      <CreateLobby config={config} adminLobby={adminLobby} setAdminLobby={setAdminLobby} lobbyCount={lobbyCount} setLobbyCount ={setLobbyCount} />
      <AllLobby alllobby={alllobby}  setTitle={setTitle} adminLobby={adminLobby} title={title}  setLobbyId={setLobbyId} setAdminId={setAdminId}   />
      
    </section>
    <section className='middle-side'>
      
     <MiddleTitle title={title} />
     <Messages messages={messages} display={display} config={config} messageCount={messageCount} setMessageCount={setMessageCount} LobbyId={LobbyId} adminId={adminId}  />
     <Sendmessage config={config} LobbyId={LobbyId} setMessages={setMessages} messages={messages} messageCount={messageCount} setMessageCount={setMessageCount} />

    </section>
     <section className='right-side'>
      <div className='right-side-title'>
        <h2>All User</h2>
      </div>
      
        < AddUser LobbyId={LobbyId} config={config} allUser={allUser} setAllUser={setAllUser} adminId={adminId} display={display} count={count} setCount={setCount}  />
        < AllUser allUser={allUser} config={config} LobbyId={LobbyId} setAllUser={setAllUser} adminId={adminId} display={display} count={count} setCount={setCount} />
     </section>
     
    </main>
  )
}

export default Main
