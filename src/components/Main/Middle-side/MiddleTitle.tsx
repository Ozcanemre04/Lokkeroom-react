import React from 'react'

interface Title{
    title:string|null|undefined
}

const MiddleTitle:React.FC<Title> = ({title}) => {
     
     
  return (
    <div className='title'>
      <h1>{title}</h1>
    </div>
  )
}

export default MiddleTitle
