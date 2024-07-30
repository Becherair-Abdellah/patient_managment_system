"use client";
import React, { useState } from "react";
import BasicInformationForm from "./BasicInformationForm";
import ScheduleAppointmentForm from "./ScheduleAppointmentForm";
import ali from "@/public/assets/user.svg";
import appoi from "@/public/assets/appointment.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { BsFillSendCheckFill } from "react-icons/bs";
import CustomButton from "../CustomButton";
import { useSelector } from "react-redux";
const NewAppointmentForm = ({userId}) => {
  const basic = useSelector((state) => state.progessStatus.basic);
  const schedule = useSelector((state) => state.progessStatus.schedule);
  const success = useSelector((state) => state.progessStatus.success);
  const [loading, setLoading] = useState(false);
  return (
    <div className=" p-3 rounded-md">
      {!basic && (
        <>
          <div className="mb-7">
            <h1 className="text-xl text-primaryColor  font-bold">
              Basic Information
            </h1>
            <span className="text-md text-gray-500 italic ">setp 1</span>
          </div>
          <BasicInformationForm />
        </>
      )}
      {basic && !schedule && (
        <>
          <div className="mb-7">
            <h1 className="text-xl text-primaryColor  font-bold">
              Schedule Appointment
            </h1>
            <span className="text-md text-gray-500 italic ">setp 2</span>
          </div>
          <ScheduleAppointmentForm userId={userId} />
        </>
      )}
      {schedule && (
<>
<div className="mb-7">
                  <h1 className="text-xl text-primaryColor  font-bold">
                    Great Progress!
                  </h1>
                  <span className="text-md text-gray-500 italic ">setp 3</span>
                </div>
        <div className="text-center space-y-10">
          <div className="flex justify-center items-center">
            <BsFillSendCheckFill className="text-primaryColor" size={100} />
          </div>
          <p>
            your Appointment has been successful sent we confirm that shortly
          </p>
        </div>
</>
      )}
    </div>
  );
};

export default NewAppointmentForm;
