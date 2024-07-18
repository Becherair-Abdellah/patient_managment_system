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
import { createuser, registerPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldTypes } from "./PatientForm";
import { Label } from "@/components/ui/label";
import { GenderField } from "@/app/constants/constants";
import { IdentificationTypes } from "@/app/constants/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors } from "@/app/constants/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploder from "../FileUploder";
import { PatientFormValidation } from "@/lib/validtaion";
import { PatientFormDefaultValues } from "@/app/constants/constants";
function RegisterForm({user}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(PatientFormValidation),
    
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
      Occupation: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit({
    identificationDocument,...patient}) {
      let formData ;
      if(identificationDocument && identificationDocument.length>0){
        const blobFile = new Blob([identificationDocument[0]],{type:identificationDocument[0].type});
        formData = new FormData();
        formData.append('fileBlob',blobFile);
        formData.append("fileName",identificationDocument[0].name)
      }
     
      const PatientData ={
        userId: user.$id,
        identificationDocument: formData,
        ...patient
      }
    const newPatient = await registerPatient(PatientData);
    if(newPatient) router.push(`/patients/${user.$id}/new-appointment`);
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
            name="birthDate"
            label="birth Date"
            // placeholder="abdellah2gmail.com"
            iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.skeleton}
            control={form}
            name="gender"
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
            name="address"
            label="Address"
            placeholder="14 th Street , New York"
            iconSrc={i2}
            // iconAlt="email"
          />

          <CustomField
            fieldType={FormFieldTypes.Input}
            control={form}
            name="occupation"
            label="Occupation"
            placeholder="Softwere engineer"
            iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.Input}
            control={form}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Softwere engineer"
            iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.phone_input}
            control={form}
            name="emergencyContactNumber"
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
          name="primaryPhysician"
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
          name="insuranceProvider"
          label="Insurance Provider"
          placeholder="blue ride fide"
          iconSrc={i2}
          // iconAlt="email"
        />
        <CustomField
          fieldType={FormFieldTypes.Input}
          control={form}
          name="insurancePolicyNumber"
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
          name="currentMedication"
          label="Current Medication"
          placeholder="Paracetamol 500mg , Ibuprofen 200mg"
          iconSrc={i2}
          // iconAlt="email"
        />

        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="familyMedicalHistory"
          label="Family Medical History"
          placeholder="just some allergies"
          iconSrc={i2}
          // iconAlt="email"
        />
        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="pastMedicalHistory"
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

        <CustomField
          fieldType={FormFieldTypes.select}
          control={form}
          name="identificationType"
          label="Identification Type"
          placeholder="Ex: Driver's License"
          iconSrc={i2}
          // iconAlt="email"
        >
          {IdentificationTypes.map((idType) => (
            <SelectItem key={idType} value={idType}>
              {idType}
            </SelectItem>
          ))}
        </CustomField>
        <CustomField
          fieldType={FormFieldTypes.Input}
          control={form}
          name="identificationNumber"
          label="Identification Number"
          placeholder="Ex: 12345668"
          iconSrc={i2}
          // iconAlt="email"
        />

        <CustomField
          fieldType={FormFieldTypes.skeleton}
          control={form}
          name="identificationDocument"
          label="Scanned copy of identification document"
          // placeholder="abdellah2gmail.com"
          iconSrc={i2}
          // iconAlt="email"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploder files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <div>
          <CustomField
            fieldType={FormFieldTypes.checkbox}
            control={form}
            name="treatmentConsent"
            label="I consent to Treatment"
             placeholder="abdellah2gmail.com"
            //iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.checkbox}
            control={form}
            name="disclosureConsent"
            label="I consent to Treatment"
             placeholder="abdellah2gmail.com"
            //iconSrc={i2}
            // iconAlt="email"
          />
          <CustomField
            fieldType={FormFieldTypes.checkbox}
            control={form}
            name="privacyConsent"
            label="I consent to Treatment"
             placeholder="abdellah2gmail.com"
            //iconSrc={i2}
            // iconAlt="email"
          />
        </div>

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
