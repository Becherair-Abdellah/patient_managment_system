'use client'
import React from 'react'
import { BsClipboard2DataFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { Progress } from './ui/progress'
import { useEffect, useState } from "react"

const ProgressBar = ({className,icon,state,withoutbar}) => {
  console.log(state);
  const [isCheck,setIsCheck] = useState(false);
  const [progress, setProgress] = useState(0)
  useEffect(() => {
      const timer = setTimeout(() => {
        setProgress(30);
        if(state){
          setProgress(100);
          setTimeout(()=>{
            setIsCheck(true);
          },200)
        }
      }, 500)
      return () => clearTimeout(timer)

    }, [state]);

  return (
    <div className={className}>
        <div className="relative ">
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

     {/* bar */}
{!withoutbar &&      <div className="bg-gray-200 h-[4px] w-[150px] rounded-full rotate-90 absolute left-[-57px] top-[114px]">
    <Progress value={progress} className="w-[100%]" />
    </div>}
    </div>
    </div>
  )
}

export default ProgressBar
