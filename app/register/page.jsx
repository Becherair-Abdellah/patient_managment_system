import Image from "next/image";
import register from "@/public/assets/register.svg";
import RegisterUserForm from "@/components/forms/RegisterUserForm";
import EnterKey from "@/components/EnterKey";
import helth from "@/public/assets/health-check.svg";
const page = ({ searchParams: { admin } }) => {
  const IsAdmin = admin;
  return (
    <>
      {IsAdmin && <EnterKey />}
<div class="">
   
        <div class="grid md:grid-cols-2  w-full h-screen">

          <div className="bg-primaryColor space-y-[5rem] p-6 hidden md:block">
         <div>
         <h1 className="text-6xl leading-[4rem] text-white font-bold mb-6">
         Start Your Health Journey with Us
          </h1>
          <p className="text-lg font-semibold text-white">
          Book an appointment with experienced healthcare professionals and receive expert care tailored to your needs. 
          </p>
         </div>

         <div className="flex justify-center my-10">
         <Image 
          src={helth}
          width={300}
          height={300}
          alt="image for health care appointment"/>
         </div>

          <p className="text-center text-white">@ copywrirte - all reserved 2024</p>
        </div>

        <div className="p-6 space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl md: font-bold text-primaryColor">
            Register Here!
            </h1>
            <p className="text-md  font-semibold mt-3 text-gray-500">
            To book appointments, please create an account. This will allow you to register patients and schedule appointments.
            </p>
          </div>

          <div className="flex justify-center items-center ">
            <Image
              src={register}
              width={180}
              height={180}
              alt="medical healthycare image for appointment"
            />
          </div>
          <RegisterUserForm className="text-lg text-white bg-primaryColor cursor-pointer w-full" />
        </div>

       
      </div>
    </div>
    </>
  );
};

export default page;
