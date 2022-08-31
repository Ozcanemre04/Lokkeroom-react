import React, { useEffect, useState } from 'react'
import { Register } from '../components/register/Register';
import  Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import message from '../assets/message.jpg';
interface Props {
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
    logged:boolean
}


export const Login:React.FC<Props>= ({setLogged,logged}) => {
    const [isShown,setIsShown] = useState<boolean>(false)
    const [input,setInput] = useState({email:"",password:""})
    
    function handleClick(){
        setIsShown(current => !current)
    }
  
    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void{
        e.preventDefault()
        axios.post('https://lokkeroom.herokuapp.com/api/login', {
          'email': input.email,
          'password':input.password
        })
         .then(res=> {
            localStorage.setItem('token',JSON.stringify(res.data.accessToken) )
            setLogged(true)

        })
        .catch(error=>console.log(error));
      }
    
      

      const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}= e.target
        setInput({...input,[name]:value})
        }

  return (
    <main className='login-main'>  
    <section className='login'>
        <form action="" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
            <input type="text" name='email' placeholder='write you email' value={input.email} onChange={handleChange} />
            <input type="password" name='password' placeholder='write your password' value={input.password} onChange={handleChange} />
            <button type='submit'>Login</button>
            {logged&& <Link to={"/lokkeroom"}><p>go to main page</p></Link>}
        </form>
        <button onClick={handleClick}>Register</button>
    </section>
    <section className='loccker-img'>
        <img src={message} alt="" />
    </section>
            
    <Modal isOpen={isShown}  ariaHideApp={false} className='modal'>
      <section className='register'>
      <Register setIsShown={setIsShown} />
      </section>
    </Modal>
            
    </main>
  )
}
