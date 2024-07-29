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
import { BasicInformationFormValidations, UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import "@/styles/date-picker.css"
import {

  SelectItem,

} from "@/components/ui/select"

import {
  getAccount,
  logout,
  register,
  verificationAccount,
} from "@/lib/actions/register-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import address from '@/public/assets/address.svg'
import { Doctors } from "@/constants";
import Image from "next/image";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function ScheduleAppointmentForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(BasicInformationFormValidations),
    defaultValues: {
      doctor: "",
      schedule: new Date(),
      phone: "",
      address: "",
      notes: "",
    },
  });
  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      setError(false);
      //   const response = await fetch(`http://localhost:3000/api/register`,{
      //     method: 'POST',
      //     headers:{
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(values)
      //   });
      //   const data = await response.json();
      //   console.log(data);
      // const verifyAccount = await verificationAccount();
      //   if(data){
      // router.push(`/patient/${data.$id}/register`);
      // setLoading(false) ;
      // const currentUser = await getAccount();
      // console.log(currentUser);
      //   }else{
      //     setError(true);
      //     setLoading(false) ;
      //   }
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
            name="note"
            label="Notes"
            placeholder="i have some pain in my back"
          />
          <CustomButton type="submit" text="Next" loading={loading} />
        </form>
      </Form>
    </>
  );
}
