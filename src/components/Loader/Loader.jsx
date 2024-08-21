import React from 'react'
import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <>
      <div className="text-TextColor h-[80vh] text-3xl flex items-center justify-center ">
         <CgSpinner className='animate-spin'/>
      </div>
    </>
  )
}

export default Loader