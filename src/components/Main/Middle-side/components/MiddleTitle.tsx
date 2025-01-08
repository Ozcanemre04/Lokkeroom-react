import { faUserPlus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useContext } from 'react'
import { AdminIdContext, DisplayContext } from '../../../../pages/Main'

interface Title{
    title:string|null|undefined
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>
}

const MiddleTitle:React.FC<Title> = ({title,setIsShown}) => {
  const display = useContext(DisplayContext)
  const adminId = useContext(AdminIdContext)

  return (
    <div className='title'>
      <h1>{title}</h1>
      {
        display?.id===adminId&&
        <button onClick={()=>{setIsShown(true)}}>
            <FontAwesomeIcon className='x'  icon={ faUserPlus} />
        </button>
      }
    </div>
  )
}

export default memo(MiddleTitle)
