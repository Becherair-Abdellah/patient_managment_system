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
import {
  BasicInformationFormValidations,
  ScheduleFormValidations,
  UserFormValidation,
} from "@/lib/validation";
import { useState } from "react";
import "@/styles/date-picker.css";
import { SelectItem } from "@/components/ui/select";
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
import address from "@/public/assets/address.svg";
import { Doctors } from "@/constants";
import Image from "next/image";
import { cancel_appointment, update_appointment } from "@/lib/actions/dashboard-actions";
import { CancelFormValidations } from "@/lib/validation";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function CancelAppointment({appointment,changeState }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(CancelFormValidations),
    defaultValues: {
      cancelReason: appointment?  appointment.cancelReason : "",
    },
  });
  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);
    try {
      setError(false);
      const dataAppointment = {
        ...values,
        patient: appointment?.patient,
        patientId: appointment?.patient?.$id,
        userId: appointment?.userId,
        status: 'canceled',
      };
      console.log(dataAppointment);
      const response = await cancel_appointment(appointment?.$id,dataAppointment);
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
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancelReason"
            label="Notes"
            placeholder="i have some pain in my back"
          />

          <CustomButton
            type="submit"
            text="Cancel Appointment"
            loading={loading}
          />

        </form>
      </Form>
    </>
  );
}
