'use client'

import Image from "next/image"
import closeEye from '@/public/assets/close-eye.svg'
import openEye from '@/public/assets/open-eye.svg'
const ShowHidePassword= ({state}) => {
  return (
    <div className="absolute right-2 cursor-pointer">
     {state ? <Image
      src={openEye}
      width={25}
      height={25}
      alt="open eye hide password"
      />:
      <Image
      src={closeEye}
      width={25}
      height={25}
      alt="close eye hide password"
      />} 
    </div>
  )
}

export default ShowHidePassword
