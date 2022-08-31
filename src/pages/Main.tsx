import React, { useEffect } from 'react'
import axios from 'axios'

import Userinfo from '../components/Main/Left-side/Userinfo';

interface Props{
  display: {name: string;id: string;}
  setDisplay: React.Dispatch<React.SetStateAction<{name: string;id: string;}>>
  setLogged:React.Dispatch<React.SetStateAction<boolean>>
  token:string
  }

  
  
const Main:React.FC<Props> = ({display,setDisplay,token,setLogged}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
//useEffect
useEffect(()=>{
  axios.get('https://lokkeroom.herokuapp.com/api/user',config)
  .then(res=>setDisplay(res.data))
},[token]);




  return (
    <main className='main'>
    
    <section className='left-side'>
      < Userinfo display={display} setLogged={setLogged} />
    </section>
     <section className='right-side'>
      <h1>gi</h1>
  
     </section>
     
    </main>
  )
}

export default Main
