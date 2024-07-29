'use client'
import React from 'react'
import { BsClipboard2DataFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

const IconBarProgress = ({className,icon}) => {
    const isCheck = false;
  return (
    <div className={`w-[37px] h-[37px] border-dashed border-2 border-primaryColor rounded-full p-[1px] ${className}  `}>
       {isCheck ? (
         <div className="w-full h-full bg-green-600 rounded-full flex justify-center items-center">
           <FaCheck color="white" size={17} />
         </div>
       ) : (
         <div className="w-full h-full bg-primaryColor rounded-full flex justify-center items-center">
           {/* <BsClipboard2DataFill color="white" size={17} /> */}
           {icon}
         </div>
       )}
     </div>

  )
}

export default IconBarProgress
