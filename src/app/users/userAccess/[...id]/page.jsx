import React from 'react'

const page = ({params}) => {
  return (
    <div className= "text-3xl">{params.id}</div>
  )
}

export default page;