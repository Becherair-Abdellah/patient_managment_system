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
import { UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import { createUser } from "@/lib/actions/register-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function RegisterUserForm() {
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email:"",
      password: "",
      phone:"",
    },
  });

  const onSubmit = async(values) =>{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      const newUser = await createUser(values);
      if(newUser){
        router.push(`/patient/${newUser.$id}/register`);
        setLoading(false) ;
      }
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    

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
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          placeholder="password"
          label="Password"
          iconSrc={lock}
          iconAlt="user color"
        />

<CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone"
        />

        <CustomButton type="submit" text={`Register`}  loading={loading} />
      </form>
      <div className="text-center">
      <div>
        login as 
         
      <button onClick={(e)=>{e.preventDefault()}}>
      <Link href='register/?admin=true' className="">  <strong className="text-primaryColor ml-1" >  admin</strong></Link>
      </button>

      </div>
      <div>
        I have an account just need to
      <Link href='/login' className=""> <strong className="text-primaryColor" >login</strong></Link>
!
      </div>
      </div>
    </Form>
    </>
  );
}
