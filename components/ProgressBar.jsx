'use client'
import React from 'react'
import { BsClipboard2DataFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { CustomProgress } from './CustomProgress'
import IconBarProgress from './IconBarProgress'

const ProgressBar = ({className,icon}) => {
  return (
    <div className={className}>
        <div className="relative ">
            <IconBarProgress icon={icon}/>

     {/* bar */}
        <CustomProgress/>
    </div>
    </div>
  )
}

export default ProgressBar
