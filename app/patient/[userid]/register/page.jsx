import Image from "next/image";
import register from "@/public/assets/register.svg";
import RegisterUserForm from "@/components/forms/RegisterUserForm";
import helth from "@/public/assets/health-check.svg";
import { CustomProgress } from "@/components/CustomProgress";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import ProgressBar from "@/components/ProgressBar";
import IconBarProgress from "@/components/IconBarProgress";
import { IoCalendar } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import LoginUserForm from "@/components/forms/LoginUserForm";
import NewAppointmentForm from "@/components/forms/NewAppointmentForm";
const page = ({ searchParams: { admin } }) => {
  const isCheck = false;

  return (
    <>
      <div className="">
        <div class="grid md:grid-cols-2  w-full h-screen">
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

          <div className="p-3 space-y-0">
            {/* registration and appointments  */}

            <div className="flex gap-4 w-full ">
              <div className="">
                {/* icon bar */}

                <ProgressBar
                  icon={<BsClipboard2DataFill color="white" size={17} />}
                />
                <ProgressBar
                  className="mt-[160px]"
                  icon={<IoCalendar color="white" size={17} />}
                />
                <IconBarProgress
                  className="mt-[160px]"
                  icon={<GoGoal color="white" size={17} />}
                />
              </div>
              <div className=" flex-1 w-full h-full">
                <NewAppointmentForm/>
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
