import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import Main from './pages/Main';
import './Sass/App.scss'
import { io } from 'socket.io-client';



function App() {
  const [logged,setLogged] =useState(false)  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth setLogged={setLogged} logged={logged} />} />  
      <Route path='/lokkeroom' element={<Main setLogged={setLogged}  />} />
    </Routes>
    </BrowserRouter>
    
   
    </>
  );
}

export default App;
