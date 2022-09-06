import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


interface Props{
    
    message: {
        message: string;
        name: string;
        id: string;
        author_id: string;
    }

   
    display: {
        name: string;
        id: string;
    }
    config: {
      headers: {
          Authorization: string;
      };
  }

  messageCount: number
  setMessageCount: React.Dispatch<React.SetStateAction<number>>
}

const EachMessage:React.FC<Props> = ({display,message,config,messageCount,setMessageCount}) => {

const[active,setActive] = useState(false)
const[input,setInput] = useState('')
function handleDelete( e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    const id = e.currentTarget.id
    axios.delete('https://lokkeroom.herokuapp.com/api/lobby/message/'+id,config)
    .then(res=>console.log(res.data))
    setMessageCount(messageCount + 1)
}


 
 
 function handleChange(e:React.ChangeEvent<HTMLInputElement>){
  e.preventDefault()
   setInput(e.target.value);
   
 }  
 function handleClick(){
  setActive(current=>!current)
 }
 function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
  const id =e.currentTarget.parentElement?.id
  
  axios.patch('https://lokkeroom.herokuapp.com/api/lobby/message/'+id,{
    message:input
  },config)
  .then(res=>console.log(res.data)
  )
  setMessageCount(messageCount +1)
  setActive(current=>!current)
 }
  return (
    <>
      <div className={ display.id===message.author_id?'own-message':'message'} key={message.id} id={message.id} >
          <div className='left'>
            
            <p>{message.author_id}</p>
            <p className={active===true?'hide':'display'}>{message?.message}</p>
            <input type="text"   className={active===true?'display':'hide'} onChange={handleChange} />
          </div>
            <div className='right' id={message.id}>
              <button  className={active===true?'hide':'display'} onClick={handleClick}>patch</button>
              <button className={active===true?'display':'hide'} onClick={handleUpdate}>+</button>
              <button onClick={handleDelete} id={message?.id}><FontAwesomeIcon icon={ faTrash} /></button>
            </div>
            
            </div>
    </>
  )
}

export default EachMessage
