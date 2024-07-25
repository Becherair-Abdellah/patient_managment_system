'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import loader from '@/public/assets/loading.svg'
const CustomButton = ({className,href,type,text,loading,onClick}) => {
  return (
    <Button onClick={onClick} variant="" type={`${type}`||''} className={`${loading?'bg-red-900 pointer-events-none':''} ${className||"text-md text-white bg-primaryColor cursor-pointer w-full"}`}>
   {!type ?  <Link href={`${href|| ''}`} className="w-full">
   {loading||text}
    </Link>: loading||text}
    {loading && type && <Image
    src={loader}
    width={25}
    height={25}
    alt='loader'
    className='animate-spin_fast'
    />}
    </Button>
  )
}

export default CustomButton
