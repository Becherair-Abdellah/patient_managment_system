"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import CustomField from "../CustomField"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import i1 from '@/app/assets/icon/user.svg'
import i2 from '@/app/assets/icon/email.svg'
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validtaion"
export const FormFieldTypes = {
  Input: 'input',
  Textarea: 'textarea',
  phone_input: 'phoneinput',
  checkbox: 'checkbox',
  date_picker: 'datePicker',
  select: 'select',
  skeleton: 'skeleton',

}

function PatientForm() {
  const [isLoading,setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  });
    // 2. Define a submit handler.
    function onSubmit(values) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      setIsLoading(true);
      console.log('re run');
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CustomField
      fieldType={FormFieldTypes.Input}
      control={form.control}
      name="abdellah"
      label="Full Name"
      placeholder="Jhon Doe"
      iconSrc={i1}
      iconAlt="user"
      />

<CustomField
      fieldType={FormFieldTypes.phone_input}
      control={form.control}
      name="phone"
      label="phone"
      placeholder="(213) 666 364546"
      />
<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm
