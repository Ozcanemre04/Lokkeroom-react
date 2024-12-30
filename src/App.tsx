import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import Main from './pages/Main';
import './Sass/App.scss'
import { io } from 'socket.io-client';



function App() {
  const [logged,setLogged] =useState(false)
  const [display,setDisplay] =useState({'name':'','id':''})
  const [token,setToken] = useState('')
  const givetoken=()=>{
    const tokken = JSON.parse(localStorage.getItem('token')|| '{}')
     setToken(tokken)
}
   useEffect(()=>{
       givetoken()
   },[logged,display])
  
  
  
  return (
    <>
    
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth setLogged={setLogged} logged={logged} />} />  
      <Route path='/lokkeroom' element={<Main  display={display} setDisplay={setDisplay} setLogged={setLogged} token={token}  />} />
    </Routes>
    </BrowserRouter>
    
   
    </>
  );
}

export default App;
