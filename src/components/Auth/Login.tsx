import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface Props {
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
    logged:boolean
  
}

export const Login:React.FC<Props>= ({setLogged,logged}) => {
     const [input,setInput] = useState({email:"",password:""})
     const [error,setError] = useState({error:""})
     let navigate = useNavigate();
     function handleSubmit(e:React.FormEvent<HTMLFormElement>):void{
        e.preventDefault()
        axios.post('http://localhost:5000/api/login', {
          'email': input.email,
          'password':input.password
        })
         .then(res=> {
          if(error.error.length===0){
            localStorage.setItem('token',JSON.stringify(res.data.accessToken) )
            setLogged(true)
            navigate("/lokkeroom")
          }


        })
        .catch(error=>setError(error.response.data));
      }

      const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
              const{name,value}= e.target
              setInput({...input,[name]:value})
              setError({error:""})
              }


  return (
   
    <div className='form-container'>
            <h2>login</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='input-container'>
                <input type="text" name='email' placeholder='Email' value={input.email} onChange={handleChange} />
                </div>

                <div className='input-container'>
                <input type="password" name='password' placeholder='Password' value={input.password} onChange={handleChange} />
                </div>

                {error.error.length>0&&
                  <div className='error'>
                    <p>{error.error}</p>
                  </div>
                }
                <button type='submit' className='submit'>Login</button>

              
            </form>            
     </div>
        
  )
}
