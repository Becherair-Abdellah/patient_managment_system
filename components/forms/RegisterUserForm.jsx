"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFieldType } from "../CustomFormField";
import {
  Form,
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import CustomButton from "../CustomButton";
import lock from "@/public/assets/lock.svg";
import email from "@/public/assets/email-color.svg";
import user from "@/public/assets/user-color.svg";
import { UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomAlert from "../CustomAlert";
import { MdOutlineError } from "react-icons/md";
export default function RegisterUserForm() {
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name:"",
      email:"",
      password: "",
    },
  });
  const test = async ()=>{
try {
  const response = await fetch("http://localhost:3000/api/logout",{
    method:"POST"
  });
  const data = await response.json();
  if(data){
    router.push('/login');
  }
} catch (error) {
  console.log(error);
}
  }
  const onSubmit = async(values) =>{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      setError(false);
      const response = await fetch(`/api/register`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if(data){
        router.push(`/patient/${data.userId}/register`);
        setLoading(false) ;
      }else{
        setError(true);
        setLoading(false) ;
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
    {error && <CustomAlert title="email Already exist" state="failure" discr="please enter another email" icon={<MdOutlineError size={20} color="red" />} />}
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
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          placeholder="password"
          label="Password"
          iconSrc={lock}
          iconAlt="user color"
        />

        <CustomButton type="submit" text="register"  loading={loading} />
      </form>
      <div className="text-center pt-10">
      <div>
        login as 
         
      <button onClick={(e)=>{e.preventDefault()}}>
      <Link href='register/?admin=true' className="">  <strong className="text-primaryColor ml-1" >  admin</strong></Link>
      </button>

      </div>
      <div>
        I have an account just need to
      <Link href="/login" className=""> <strong className="text-primaryColor">Login</strong></Link>
!
      </div>
      </div>
    </Form>
    </>
  );
}
