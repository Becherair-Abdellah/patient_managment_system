import Image from "next/image";
import register from "@/public/assets/register.svg";
import RegisterUserForm from "@/components/forms/RegisterUserForm";
import EnterKey from "@/components/EnterKey";
import helth from "@/public/assets/health-check.svg"
const page = ({ searchParams: { admin } }) => {
  const IsAdmin = admin;
  console.log(IsAdmin);
  return (
    <>
      {IsAdmin && <EnterKey />}
      <div className="flex h-screen ">
        <div className="bg-primaryColor space-y-[5rem] p-6 hidden md:block">
         <div>
         <h1 className="text-5xl text-white font-bold mb-6">
            Start your Health with us
          </h1>
          <p className="text-lg font-semibold text-white">
            Get Appointment with professional Doctors in Healthcare Fileds
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
            <h1 className="text-2xl font-bold text-primaryColor">
              Register Here!
            </h1>
            <p className="text-md  font-semibold mt-3 text-gray-500">
              to Get an appointemnt please create an Account to start regisetr
              patients and schedule appointments{" "}
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
    </>
  );
};

export default page;
