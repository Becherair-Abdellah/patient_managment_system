import Image from "next/image"

import mediacl from '@/public/assets/medical.svg'
import CustomButton from "@/components/CustomButton"
export default async  function Dashboard({searchParams}) {
  return (
   <div className="flex justify-center items-center h-screen">
   <div className=" md:text-center h-fit pt-[70px] md:max-w-[650px]  space-y-14 p-5">
   <div>
      <h1 className="text-4xl font-bold text-primaryColor">Welcome!</h1>
      <p className="text-xl  font-semibold mt-3 text-gray-500">Hi there! You can now book an appointment with any doctor in any field at a great price and at your convenience. Get started now! </p>
    </div>

    <div className="flex justify-center items-center ">
      <Image
      src={mediacl}
      width={250}
      height={250}
      alt="medical healthycare image for appointment"
      />
    </div>

  <div className="space-y-4">
    <CustomButton href={'/register'} text={`Sign Up`}/>
    <CustomButton href={'/login'} text={`Login`}/>
  </div>

   </div>
   </div>
  )
}
