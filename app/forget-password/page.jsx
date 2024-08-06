import Image from "next/image";
import register from "@/public/assets/forget-password.svg";
import EnterKey from "@/components/EnterKey";
import ForgetPasswordUserForm from "@/components/forms/ForgetPasswordUserForm";
const page = ({ searchParams: { admin } }) => {
  const IsAdmin = admin;
  return (
    <>
      {IsAdmin && <EnterKey />}
      <div>
        <div className="flex justify-center items-center  w-full h-screen">
          {/* <div className="bg-primaryColor space-y-[5rem] p-6 hidden md:block">
         <div>
         <h1 className="text-6xl leading-[4rem] text-white font-bold mb-6">
            Start your Health with us
          </h1>
          <p className="text-lg font-semibold text-white">
            Get Appointment with professional Doctors in Healthcare Fileds snghd jah qkhcahdhe ahakjdhqky ascqs 
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
        </div> */}

          <div className="p-6 space-y-20">
            <div className="flex justify-center items-center ">
              <Image
                src={register}
                width={250}
                height={250}
                alt="medical healthycare image for appointment"
              />
            </div>


            <div>
              <div className="mb-5">
                <h1 className="text-3xl md:text-4xl md: font-bold text-primaryColor">
                  Forget Password?
                </h1>
                <p className="text-md  font-semibold mt-3 text-gray-500">
                  Don&apos;t worry! it accure, Please enter your email address linked
                  with your account
                </p>
              </div>

              <ForgetPasswordUserForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
