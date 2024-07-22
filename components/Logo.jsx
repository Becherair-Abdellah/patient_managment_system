
import logo from '@/public/logo.png'
import Image from 'next/image'
const Logo = () => {
  return (
  
      <h1 className="flex flex-col items-center my-6  text-2xl font-semibold text-primaryColor ">
        <Image
         src={logo}
         width={70}
         height={70}
         alt="logo appointHealth"/>
         healthycare
         </h1>
   
  )
}

export default Logo
