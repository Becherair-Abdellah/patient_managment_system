import Image from "next/image";
import React from "react";
import success from "@/public/assets/success.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDateTime } from "@/lib/utils";
import { getAppointment } from "@/lib/actions/register-patient.action";
import AddNewAppointemnt from "@/components/AddNewAppointemnt";
import AddNewPatient from "@/components/AddNewPatient";
import Logout from "@/components/Logout";
const page = async ({ params: { userid, appointmentid } }) => {
  const appointment = await getAppointment(appointmentid);
  return (
   <>
    <Logout/>
    <div className=" flex justify-center items-center  h-screen max-h-screen px-[5%]">
      <div className="">
   
        <section className="flex flex-col items-center">
          <Image
            src={success}
            height={200}
            width={180}
            alt="success"
            className="md:w-[280px] md:h-[300px]"
          />
          <h2 className="md:text-xl text-md  max-w-[600px] text-center mt-10 mb-10">
            Your <span className="text-primaryColor">appointment request</span>{" "}
            has been successfully submitted!
          </h2>
          <p className="text-gray-700 mb-2">
            We'll be in touch shortly to confirm.
          </p>
        </section>

        <section className="flex items-center justify-center gap-2 md:gap-4 bg-gray-50 rounded-md px-2 py-1 mb-4 border-2">
          <div className="flex  items-center gap-3 text-sm md:text-md ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="whitespace-nowrap">{appointment?.doctor}</p>
          </div>

          <div className="flex items-center text-sm md:text-md gap-2">
            <FaCalendarAlt szie={24} />
            <p> {formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <AddNewAppointemnt
            url={`/patient/${appointment?.userId}/register?patientId=${appointment?.patient?.$id}`}
          />

          <AddNewPatient url={`/patient/${appointment?.userId}/register`} />
        </div>

        <p className="w-full text-center mt-10 text-gray-700">
          @ copywrirte - all reserved 2024{" "}
        </p>
      </div>
    </div>
   </>
  );
};

export default page;
