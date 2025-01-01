import { faUser, faUserEdit, faUserMinus, faUserPlus, faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'

interface Title{
    title:string|null|undefined
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>
    adminId:string;
    display: {
      name: string;
      id: string;
  }
}

const MiddleTitle:React.FC<Title> = ({title,setIsShown,display,adminId}) => {
     
     
  return (
    <div className='title'>
      <h1>{title}</h1>
      {
        display.id===adminId&&
        <button onClick={()=>{setIsShown(true)}}>
            <FontAwesomeIcon className='x'  icon={ faUserPlus} />
        </button>
      }
    </div>
  )
}

export default memo(MiddleTitle)
