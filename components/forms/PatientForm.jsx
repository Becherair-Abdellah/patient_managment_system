"use client"
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
import { createuser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  });
    // 2. Define a submit handler.
  async  function onSubmit({name,email,phone}) {
      setIsLoading(true);
      try{
        const userData = {name,email,phone};
        const user = await createuser(userData);
       
       if (user) router.push(`patients/${user.$id}/register`);
      }
      
      
      
      catch(error){
        console.log(error)
      }
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

<CustomField fieldType={FormFieldTypes.Input}
      control={form}
      name="name"
      label="Full name"
      placeholder="Abdellah"
      iconSrc={i1} 
      iconAlt="user"/>
<CustomField fieldType={FormFieldTypes.Input}
      control={form?? ''}
      name="email"
      label="email"
      placeholder="abdellah2gmail.com"
      iconSrc={i2} 
      iconAlt="email"/>

<CustomField 
      fieldType={FormFieldTypes.phone_input}
      control={form}
      name="phone"
      label="phone"
      placeholder="abdellah2gmail.com"
      iconSrc={i2} 
      iconAlt="email"
/>

<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
<Link href={'/?admin=true'}>
<button className="text-red-900">admin</button>
</Link>
    </form>
  </Form>
  )
}

export default PatientForm
