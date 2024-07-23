import Image from "next/image"
import register from '@/public/assets/register.svg'
import RegisterUserForm from "@/components/forms/RegisterUserForm"
import EnterKey from "@/components/EnterKey";
const page = ({searchParams:{admin}}) => {
  const IsAdmin = admin;
console.log(IsAdmin);
  return (
    <>
    {IsAdmin && <EnterKey/>}
    <div className='lg:space-x-10'>
      <div className='hidden'>1</div>

      <div className='p-6 space-y-6'>

      <div>
      <h1 className="text-2xl font-bold text-primaryColor">Register Here!</h1>
      <p className="text-md  font-semibold mt-3 text-gray-500">to Get an appointemnt please create an Account to start regisetr patients and schedule appointments </p>
    </div>
    
    <div className="flex justify-center items-center ">
      <Image
      src={register}
      width={180}
      height={180}
      alt="medical healthycare image for appointment"
      />
    </div>
<RegisterUserForm className="text-lg text-white bg-primaryColor cursor-pointer w-full"/>
      </div>
    </div>
    </>
  )
}

export default page
