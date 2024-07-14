"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomField from "../CustomField";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import i1 from "@/app/assets/icon/user.svg";
import i2 from "@/app/assets/icon/email.svg";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validtaion";
import { createuser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldTypes } from "./PatientForm";
import { Label } from "@/components/ui/label";
import { GenderField } from "@/app/constants/GenderField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors } from "@/app/constants/GenderField";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      Occupation: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const user = await createuser(userData);
      console.log(user);
      if (user) router.push(`/patients/`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          fieldType={FormFieldTypes.Input}
          control={form}
          name="name"
          label="Full name"
          placeholder="Abdellah"
          iconSrc={i1}
          iconAlt="user"
        />

        <div className="flex items-center justify-between">
          <CustomField
            fieldType={FormFieldTypes.Input}
            control={form ?? ""}
            name="email"
            label="email"
            placeholder="abdellah2gmail.com"
            iconSrc={i2}
            iconAlt="email"
          />

          <CustomField
            fieldType={FormFieldTypes.phone_input}
            control={form}
            name="phone"
            label="phone"
            placeholder="abdellah2gmail.com"
            iconSrc={i2}
            iconAlt="email"
          />
        </div>

        <div className="">
          <CustomField
            fieldType={FormFieldTypes.date_picker}
            control={form}
            name="datepicker"
            label="datepicker"
            // placeholder="abdellah2gmail.com"
            iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.skeleton}
            control={form}
            name="Genders"
            label="Genders"
            // placeholder="abdellah2gmail.com"
            iconSrc={i2}
            // iconAlt="email"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderField.map((option) => (
                    <div key={option} className="w-9 h-9">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />

          <CustomField
            fieldType={FormFieldTypes.Input}
            control={form}
            name="Address"
            label="Address"
            placeholder="14 th Street , New York"
            iconSrc={i2}
            // iconAlt="email"
          />

          <CustomField
            fieldType={FormFieldTypes.Input}
            control={form}
            name="Occupation"
            label="Occupation"
            placeholder="Softwere engineer"
            iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.Input}
            control={form}
            name="EmrgencyContactName"
            label="Emergency Contact Name"
            placeholder="Softwere engineer"
            iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.phone_input}
            control={form}
            name="EmrgencyContactNumber"
            label="Emrgency Contact Number"
            placeholder=""
            iconSrc={i2}
            iconAlt="email"
          ></CustomField>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Medical information
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>

        <CustomField
          fieldType={FormFieldTypes.select}
          control={form}
          name="doctors"
          label="Doctors"
          placeholder="Select Phosician"
          iconSrc={i2}
          // iconAlt="email"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <Image
                src={doctor.image}
                width={32}
                height={32}
                alt="doctors"
                className="rounded-full border border-gray-700"
              />
              <p>{doctor.name}</p>
            </SelectItem>
          ))}
        </CustomField>

        <CustomField
          fieldType={FormFieldTypes.Input}
          control={form}
          name="InsuranceProvider"
          label="Insurance Provider"
          placeholder="blue ride fide"
          iconSrc={i2}
          // iconAlt="email"
        />
        <CustomField
          fieldType={FormFieldTypes.Input}
          control={form}
          name="InsurancePolicyNumber"
          label="Insurance Policy Number"
          placeholder="ABC123456789"
          iconSrc={i2}
          // iconAlt="email"
        />

        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="allergies"
          label="Allergies"
          placeholder="pollen , penicillin"
          iconSrc={i2}
          // iconAlt="email"
        />
        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="CurrentMedication"
          label="Current Medication"
          placeholder="Paracetamol 500mg , Ibuprofen 200mg"
          iconSrc={i2}
          // iconAlt="email"
        />

        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="FamilyMedicalHistory"
          label="Family Medical History"
          placeholder="just some allergies"
          iconSrc={i2}
          // iconAlt="email"
        />
        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="PastMedicalHistory"
          label="Past Medical History"
          placeholder="tonsiloctomy"
          iconSrc={i2}
          // iconAlt="email"
        />

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Medical information
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
