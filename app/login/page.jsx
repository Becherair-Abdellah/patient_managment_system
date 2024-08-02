import Image from "next/image";
import register from "@/public/assets/login-password.svg";
import RegisterUserForm from "@/components/forms/RegisterUserForm";
import EnterKey from "@/components/EnterKey";
import helth from "@/public/assets/health-check.svg";
import LoginUserForm from "@/components/forms/LoginUserForm";
const page = ({ searchParams: { admin } }) => {
  const IsAdmin = admin;
  console.log(IsAdmin);
  return (
    <>
      {IsAdmin && <EnterKey />}
      <div>
        <div className="grid md:grid-cols-2  w-full h-screen">
          <div className="bg-primaryColor space-y-[5rem] p-6 hidden md:block">
            <div>
              <h1 className="text-6xl leading-[4rem] text-white font-bold mb-6">
                Start your Health with us
              </h1>
              <p className="text-lg font-semibold text-white">
                Get Appointment with professional Doctors in Healthcare Fileds
                snghd jah qkhcahdhe ahakjdhqky ascqs
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

            <p className="text-center text-white">
              @ copywrirte - all reserved 2024
            </p>
          </div>

          <div className="p-6 space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl md: font-bold text-primaryColor">
                Welecom back!
              </h1>
              <p className="text-md  font-semibold mt-3 text-gray-500">
                to Get an appointemnt please login to your Account to start
                regisetr patients and schedule appointments{" "}
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
            <LoginUserForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
