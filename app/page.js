import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import mediacl from '@/public/assets/medical.svg'
import Logo from "@/components/Logo"
import CustomButton from "@/components/CustomButton"
import { updateVerificationAccount } from "@/lib/actions/register-actions"
export default async  function Dashboard({searchParams}) {
  // console.log(userId)
  // for testing verfied email
  // await updateVerificationAccount(searchParams);
  return (
   <div className="flex justify-center items-center h-screen">
   <div className=" md:text-center h-fit  md:max-w-[650px]  space-y-14 p-5">
   <div>
      <h1 className="text-4xl font-bold text-primaryColor">Welcom!</h1>
      <p className="text-xl  font-semibold mt-3 text-gray-500">Hi,Now you can to get an appoitnment with any doctors in any filed with a good price and any time Just Start Now! </p>
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
