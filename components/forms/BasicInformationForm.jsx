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
  UserFormValidation,
} from "@/lib/validation";
import { useState } from "react";
import {
  getAccount,
  logout,
  register,
  verificationAccount,
} from "@/lib/actions/register-actions";
import Link from "next/link";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import address from "@/public/assets/address.svg";
import { register_patient } from "@/lib/actions/register-patient.action";
import { basic_action, schedule_action } from "@/redux/features/progess-status";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function BasicInformationForm() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(router);
  const form = useForm({
    resolver: zodResolver(BasicInformationFormValidations),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  });
  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);
    try {
      setError(false);

      const patient = await register_patient(values);
      if (patient) {
        setLoading(false);
        dispatch(basic_action());
        router.push(`?patientId=${patient.$id}`);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          {error && (
            <CustomAlert
              title="email Already exist"
              state="failure"
              discr="please enter another email"
              icon={<MdOutlineError size={20} color="red" />}
            />
          )}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="Jhon Deo"
            label="Name"
            iconSrc={user}
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder="name@gmail.com"
            label="Email"
            iconSrc={email}
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="address"
            label="Address"
            placeholder="460 city , Yalidine street"
            iconSrc={address}
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="notes"
            label="Notes"
            placeholder="i have some pain in my back"
          />
          <CustomButton type="submit" text="Next" loading={loading} />
        </form>
      </Form>
    </>
  );
}
