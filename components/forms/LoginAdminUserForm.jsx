"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setErrorMap, z } from "zod";
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
import { LoginUserFormValidation, UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import {
  logout,
  register,
  verificationAccount,
} from "@/lib/actions/register-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/login-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MdOutlineError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import CustomAlert from "../CustomAlert";
import { getLastAppointemnt } from "@/lib/actions/register-patient.action";
import { createAdminClient } from "@/lib/appwrite.config";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function LoginAdminUserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginUserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      setError(false);
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      const {account} =await  createAdminClient();
      const user = await account.get();
      console.log(user);
      console.log(data);

      if (data) {
        
        console.log(user);
        setLoading(false);
      } else {
        console.log("RUN HERE");
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {error && (
        <CustomAlert
          title="Incorrect Credentials"
          state="failure"
          discr="your password or email is not correct"
          icon={<MdOutlineError color="red" size={20} />}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
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
          <Link href="/forget-password">
            <h2 className="text-primaryColor text-md underline mt-2">
              forget my password
            </h2>
          </Link>
          <CustomButton type="submit" text="Login" loading={loading} />
        </form>
      </Form>
    </>
  );
}
