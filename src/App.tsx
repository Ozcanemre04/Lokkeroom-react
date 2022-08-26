import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Login } from './pages/Login';
import Main from './pages/Main';
import './Sass/App.scss'

function App() {
  const [logged,setLogged] =useState(false)
  const [display,setDisplay] =useState({'name':'','id':''})
  const [token,setToken] = useState('')
   useEffect(()=>{
      const tokken = JSON.parse(localStorage.getItem('token')|| '{}')
       setToken(tokken)
       
   },[logged,display])
  
  
  
  return (
    <>
    
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login setLogged={setLogged} logged={logged}/>}/>  
      <Route path='/lokkeroom' element={<Main  display={display} setDisplay={setDisplay} setLogged={setLogged} token={token}  />} />
    </Routes>
    </BrowserRouter>
    
   
    </>
  );
}

export default App;
