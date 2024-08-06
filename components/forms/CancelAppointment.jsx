"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFieldType } from "../CustomFormField";
import {
  Form,
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import CustomButton from "../CustomButton";
import { useState } from "react";
import "@/styles/date-picker.css";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
import { cancel_appointment} from "@/lib/actions/dashboard-actions";
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
      const response = await cancel_appointment(appointment?.$id,dataAppointment);
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
