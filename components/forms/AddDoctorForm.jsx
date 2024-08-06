"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFieldType } from "../CustomFormField";
import {
  Form,
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import CustomButton from "../CustomButton";
import email from "@/public/assets/email-color.svg";
import user from "@/public/assets/user-color.svg";
import {
  DoctorFormValidations,
} from "@/lib/validation";
import { useState } from "react";
import "@/styles/date-picker.css";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
import { edit_doctor, register_doctor } from "@/lib/actions/dashboard-actions";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function AddDoctorForm({ doctor, changeState,state }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(DoctorFormValidations),
    defaultValues: {
      name: doctor?.name || '',
      email: doctor?.email||'',
      phone:doctor?.phone ||"",
      photo:''
    },
  });
  const onSubmit = async (values) => {
    setLoading(true);
    let response ;
    try {
      setError(false);
      if(state=== 'edit'){
        response = await edit_doctor(values,doctor?.$id);
      }else if (state === 'delete'){

      }else{
        response = await register_doctor(values);
      }
      
      if (response) {
        setLoading(false);
        changeState(false);
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
          <div className="flex items-center w-full space-x-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              placeholder="abdellah"
              label="Name"
              iconSrc={user}
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="name@gmail.com"
            iconSrc={email}
          />

          <CustomFormField
            fieldType={FormFieldType.FILE_INPUT}
            control={form.control}
            name="photo"
            label="Image"
          />

          <CustomButton type="submit" text={`${state === 'edit'?'Edit Doctor':'New Doctor'}`} loading={loading} />
        </form>
      </Form>
    </>
  );
}
