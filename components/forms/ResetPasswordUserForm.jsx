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
import {
  ForgetPasswordUserFormValidation,
  LoginUserFormValidation,
  ResetPasswordUserFormValidation,
  UserFormValidation,
} from "@/lib/validation";
import { useState } from "react";
import {
  logout,
  register,
  verificationAccount,
} from "@/lib/actions/register-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  forgetpassword,
  login,
  updatepassword,
} from "@/lib/actions/login-action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MdOutlineError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import CustomAlert from "../CustomAlert";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function ResetPasswordUserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cnPassword,setCnPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  // console.log("params")
  const router = useRouter();
  const params = new URLSearchParams(window?.location.search);
  const form = useForm({
    resolver: zodResolver(ResetPasswordUserFormValidation),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    !cnPassword || setCnPassword(false)
    setLoading(true);
   if(values.password === values.confirmpassword){
    try {
        setError(false);
  console.log('DEBUG')
        // reset password page
  
        const dataToUpdatePassword = {
          ...values,
          userId: params.get("userId"),
          secret: params.get("secret"),
        };
        const user = await updatepassword(dataToUpdatePassword);
        if (user) {
          setSuccess(true);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
   }else{
    setCnPassword(true)
    setLoading(false);
   }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          
            <>
              {success && (
                <CustomAlert
                  title="Success"
                  state=""
                  discr="your password has Updated"
                  icon={<FaCheckCircle color="green" size={20} />}
                />
              )}
              {error && (
                <CustomAlert
                  title="Expaire Time"
                  state="failure"
                  discr="this link is Expaire rsend email"
                  icon={<MdOutlineError color="red" size={20} />}
                />
              )}
              {cnPassword && (
                <CustomAlert
                  title="Is Not same"
                  state="failure"
                  discr="your password and confirmpassword is not same"
                  icon={<MdOutlineError color="red" size={20} />}
                />
              )}
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
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="confirmpassword"
                placeholder="confirm password"
                label="Confirm password"
                iconSrc={lock}
                iconAlt="user color"
              />

              <CustomButton
                type="submit"
                text="Reset New Password"
                loading={loading}
              />
            </>
           
        </form>
      </Form>
    </>
  );
}
