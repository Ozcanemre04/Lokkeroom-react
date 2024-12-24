import React, { useState } from 'react'
import axios from 'axios';
interface Props {
  // setIsShown:React.Dispatch<React.SetStateAction<boolean>>
}

export const Register:React.FC<Props> = () => {
  
  const [formValue,setFormValue] =useState({name:"",email:"",password:""})
  const [error,setError] = useState("")

  function handleSubmit(e:React.FormEvent<HTMLFormElement>):void{
    e.preventDefault()
    axios.post('http://localhost:5000/api/register', {
      'name': formValue.name,
      'email': formValue.email,
      'password':formValue.password
    })
    .then(res=> console.log(res))
    .catch(error=>setError(error.response.data)
    );
    
  }


  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const{name,value}= e.target
  setFormValue({...formValue,[name]:value})
  setError("")
  
  }
  return (
    <div className='form-container'>
        <h2>Register</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='input-container'>
            <input type="text" placeholder='Name' name='name' value={formValue.name} onChange={handleChange}/>
          </div>
          <div className='input-container'>
            <input type="text" placeholder='Email' name='email' value={formValue.email} onChange={handleChange}/>
          </div>
          <div className='input-container'>
            <input type="password" placeholder='Password' name='password' value={formValue.password} onChange={handleChange} />
          </div>
          {error.length>0&&
                  <div className='error'>
                    <p>{error}</p>
                  </div>
                }
            <button type='submit' className='submit'>register</button>
        </form>
        
    </div>
  )
}
