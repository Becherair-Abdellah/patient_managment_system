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
import { LoginUserFormValidation } from "@/lib/validation";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineError } from "react-icons/md";
import CustomAlert from "../CustomAlert";
import { getLastAppointemnt } from "@/lib/actions/register-patient.action";
// import f from ''

// const formSchema = z.object(UserFormValidation);

export default function LoginUserForm() {
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

      if (data) {
        const appointment = await getLastAppointemnt(data.userId);

        appointment ? router.push(`/patient/${appointment.patientId}/appointment/${appointment.$id}`):router.push(`/patient/${data.userId}/register`);
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

        <div className="text-center pt-10 ">
          <div>
            login as
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Link href="login/?admin=true" className="">
                {" "}
                <strong className="text-primaryColor ml-1"> admin</strong>
              </Link>
            </button>
          </div>
          <div>
            I don&apos;t have an account i need to
            <Link href="/register" className="">
              {" "}
              <strong className="text-primaryColor">register</strong>
            </Link>
            !
          </div>
        </div>
      </Form>
    </>
  );
}
