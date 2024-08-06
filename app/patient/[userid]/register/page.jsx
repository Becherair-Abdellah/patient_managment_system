import Image from "next/image";
import helth from "@/public/assets/register-patient.svg";
import NewAppointmentForm from "@/components/forms/NewAppointmentForm";
import Status from "@/components/Status";

const page = async ({ params: { userid } }) => {

  return (
    <>

      <div className="">
        <div class="grid md:grid-cols-2  w-full h-screen">

          <div className="space-y-[5rem] p-6 hidden md:block">
            <div>
              <h1 className="text-6xl leading-[4rem] text-primaryColor font-bold mb-6">
                Registration Patient!
              </h1>
              <p className="text-lg font-semibold text-gray-700">
              enter main information about you and write what is the reason of appointment and some notes if you need
              </p>
            </div>

            <div className="flex justify-center my-10">
              <Image
                src={helth}
                width={300}
                height={300}
                alt="image for health care appointment"
              />
            </div>

            <p className="text-center text-gray-700">
              @ copywrirte - all reserved 2024
            </p>
            
          </div>

          <div className="p-3 space-y-0 flex justify-center items-center">
            {/* registration and appointments  */}

            <div className="flex items-center gap-4 w-full ">
              <div className="">
                {/* icon bar */}
                <Status/>
              </div>
              <div className=" flex-1 w-full h-full">
                <NewAppointmentForm userId={userid}/>
              </div>
            </div>

            {/* <RegisterUserForm className="text-lg text-white bg-primaryColor cursor-pointer w-full" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
