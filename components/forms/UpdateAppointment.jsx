"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFieldType } from "../CustomFormField";
import {
  Form,

} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import CustomButton from "../CustomButton";
import user from "@/public/assets/user-color.svg";
import {
  ScheduleFormValidations,
} from "@/lib/validation";
import { useEffect, useState } from "react";
import "@/styles/date-picker.css";
import { SelectItem } from "@/components/ui/select";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
import Image from "next/image";
import { update_appointment } from "@/lib/actions/dashboard-actions";
import { getAllDoctors } from "@/lib/actions/register-patient.action";
import d_peter from '@/public/assets/dr-peter.png'
export default function UpdateAppointment({appointment,changeState }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Doctors,setDoctors] = useState();
  const form = useForm({
    resolver: zodResolver(ScheduleFormValidations),
    defaultValues: {
      doctor: appointment?.doctor || "",
      schedule: appointment
      ? new Date(appointment?.schedule)
      : new Date(Date.now()),
      reason: appointment?.reason || "",
      notes:appointment?.notes  || "",
      cancelReason: appointment?.cancelReason || "",
    },
  });

  const Doctors__ = async ()=>{
    try {
     const allDoctors = await getAllDoctors();
     console.log(allDoctors);
     setDoctors(allDoctors)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    Doctors__();

  },[]);
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      setError(false);
      const dataAppointment = {
        ...values,
        patient: appointment?.patient,
        patientId: appointment?.patient?.$id,
        userId: appointment?.userId,
        status: 'scheduled',
      };
      const response = await update_appointment(appointment?.$id,dataAppointment);
      console.log(response);
      if (response) {
        setLoading(false);
        changeState(false)
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      {error && (
        <CustomAlert
          title="Failed update"
          state="failure"
          discr="please Try Again"
          icon={<MdOutlineError color="red" size={20} />}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="doctor"
            placeholder="Doctor"
            label="Name"
            iconSrc={user}
            iconAlt="email"
          >
            {Doctors?.map((doctor, i) => (
              <SelectItem key={i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.photo || d_peter}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            label="Expected appointment date"
            showTimeSelect
            dateFormat="MM/dd/yyyy  -  h:mm aa"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reasons"
            placeholder="i have som pain on my back"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Notes"
            placeholder="i have some pain in my back"
          />
          <CustomButton
            type="submit"
            text="Schedule Appointment"
            loading={loading}
          />
        </form>
      </Form>
    </>
  );
}
