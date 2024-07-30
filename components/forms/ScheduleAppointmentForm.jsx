"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormFieldType } from "../CustomFormField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import CustomButton from "../CustomButton";
import lock from "@/public/assets/lock.svg";
import email from "@/public/assets/email-color.svg";
import user from "@/public/assets/user-color.svg";
import { BasicInformationFormValidations, ScheduleFormValidations, UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import "@/styles/date-picker.css"
import {

  SelectItem,

} from "@/components/ui/select"
import { useSearchParams } from "next/navigation";
import {
  getAccount,
  logout,
  register,
  verificationAccount,
} from "@/lib/actions/register-actions";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import address from '@/public/assets/address.svg'
import { Doctors } from "@/constants";
import Image from "next/image";
import { basic_action, schedule_action, success_action } from "@/redux/features/progess-status";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register_appointment } from "@/lib/actions/register-patient.action";
// import f from ''


// const formSchema = z.object(UserFormValidation);

export default function ScheduleAppointmentForm({userId}) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const patientId = params.get("patientId");
  const router = useRouter();
  
  console.log(typeof patientId);
  
  const form = useForm({
    resolver: zodResolver(ScheduleFormValidations),
    defaultValues: {
      doctor: "",
      schedule: new Date(),
      reason: "",
      notes: "",
      cancelReason:"",
    },
  });
  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);
    try {
      setError(false);
      const dataAppointemnt = {
        ...values,
        patient: patientId,
        userId: userId,
        status:"pending"
      }
      const appointment = await register_appointment(dataAppointemnt);
      console.log(appointment);
        if(appointment){
      setLoading(false) ;
      dispatch(schedule_action());
      dispatch(success_action());
      setTimeout(()=>router.push(`/${appointment.patient.$id}/appointment/${appointment.$id}`),5000);
        }else{
          setError(true);
          setLoading(false) ;
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
          title="Failed register"
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
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
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
          <CustomButton type="submit" text="Schedule Appointment" loading={loading} />
        </form>
      </Form>
    </>
  );
}
