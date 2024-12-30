import React, { useEffect, useState } from 'react'
import { Register } from '../components/Auth/Register';
import  Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import message from '../assets/message.jpg';
import Navbar from '../components/Navbar/Navbar';
import { Login } from '../components/Auth/Login';
import { Socket } from 'socket.io-client';
interface Props {
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
    logged:boolean;
}


export const Auth:React.FC<Props>= ({setLogged,logged}) => {
    
    const [value,setValue]=useState("login")

  return (
  <>
  <Navbar />
    <main className='auth-main'>
    <div className='container'>
    <section className='button'>
      <button className={value==="login"?"activeButton":""} onClick={()=>{setValue("login")}}>Login</button>
      <button className={value==="register"?"activeButton":""} onClick={()=>{setValue("register")}}>Register</button>
    </section>
    <section className={value==="login"?"activelogin":"login"}>
         <Login setLogged={setLogged} logged={logged}/>
    </section>

    <section className={value==="register"?"activeRegister":"register"}>
       <Register/>
    </section>
    </div>        
    </main>
    </>
  )
}
