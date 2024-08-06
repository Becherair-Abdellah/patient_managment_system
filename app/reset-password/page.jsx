import Image from "next/image";
import register from "@/public/assets/recover-password.svg";
import EnterKey from "@/components/EnterKey";
import ResetPasswordUserForm from "@/components/forms/ResetPasswordUserForm";
const page = ({ searchParams: { admin } }) => {
  const IsAdmin = admin;
  return (
    <>
      {IsAdmin && <EnterKey />}
      <div>
        <div className=" flex justify-center items-center  w-full h-screen">
         <div className="p-6 space-y-10">

         <div className="mb-5">
                <h1 className="text-3xl md:text-4xl md: font-bold text-primaryColor">
                 Create New Password!
                </h1>
                <p className="text-md  font-semibold mt-3 text-gray-500">
               your new password must be unique from those perviously  used
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


          
              

              <ResetPasswordUserForm/>
          




          </div>
        </div>
      </div>
    </>
  );
};

export default page;
