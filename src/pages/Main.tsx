import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

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
console.log(token);

useEffect(()=>{
  axios.get('https://lokkeroom.herokuapp.com/api/user',config)
  .then(res=>setDisplay(res.data))
  
},[token])
console.log(display);



function handleRemove(){
  window.localStorage.clear()
  setLogged(false)
}

  return (
    <>
    
    <div>
      <h1>{display?.name}</h1>
      <Link to={'/'}>
      <button onClick={handleRemove}>logout</button>

      </Link>
    </div>
     
     
    </>
  )
}

export default Main
