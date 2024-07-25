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

export default function ForgetPasswordUserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // console.log("params")
  const router = useRouter();
  const params = new URLSearchParams(window?.location.search);
  const form = useForm({
    resolver: zodResolver(ForgetPasswordUserFormValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      setError(false);

      // forget password  page

      const user = await forgetpassword(values);

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
                  discr="we sent a link in your email"
                  icon={<FaCheckCircle color="green" size={20} />}
                />
              )}
              {error && (
                <CustomAlert
                  title="Email Not Found"
                  state="failure"
                  discr="your Enter email is not found"
                  icon={<MdOutlineError color="red" size={20} />}
                />
              )}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                placeholder="name@gmail.com"
                label="Email"
                iconSrc={email}
                iconAlt="email"
              />
              <CustomButton
                type="submit"
                text="Reset Password"
                loading={loading}
              />

              <div className="text-center pt-3 ">
                <div>
                  I have an account just need to
                  <Link href="/login" className="">
                    {" "}
                    <strong
                      className="text-primaryColor"
                      onClick={async () => {
                        await logout();
                      }}
                    >
                      login
                    </strong>
                  </Link>
                  !
                </div>
              </div>
            </>
          
        </form>
      </Form>
    </>
  );
}
