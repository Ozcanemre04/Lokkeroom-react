import React, { useState } from 'react'
import axios from 'axios';
interface Props {
  setIsShown:React.Dispatch<React.SetStateAction<boolean>>
}

export const Register:React.FC<Props> = ({setIsShown}) => {
  
  const [formValue,setFormValue] =useState({name:"",email:"",password:""})

  function handleSubmit(e:React.FormEvent<HTMLFormElement>):void{
    e.preventDefault()
    axios.post('https://lokkeroom.herokuapp.com/api/register', {
      'name': formValue.name,
      'email': formValue.email,
      'password':formValue.password
    })
    .then(res=> console.log(res))
    .catch(error=>console.log(error));
    setIsShown(false)
  }


  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const{name,value}= e.target
  setFormValue({...formValue,[name]:value})
  console.log(formValue);
  
  }
  return (
    <>
    <button onClick={()=>setIsShown(false)} className='close'>x</button>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='name' name='name' value={formValue.name} onChange={handleChange}/>
            <input type="text" placeholder='email' name='email' value={formValue.email} onChange={handleChange}/>
            <input type="password" placeholder='password' name='password' value={formValue.password} onChange={handleChange} />
           
            <button type='submit'>register</button>
        </form>
        
    </>
  )
}
