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
import { CreateAppointmentSchema } from "@/lib/validtaion";
import { PatientFormDefaultValues } from "@/app/constants/constants";
import { registerNewAppoinetment, updateAppointmentDocuments } from "@/lib/actions/appointment.actions";
function AppointmentForm({type,userId,patientId,appointment,setOpen}) {
  let labelButton ;
  switch(type){
    case 'create':
      labelButton = 'create New Appiontment';
      break;
    case 'cancel':
      labelButton = 'Cancel Apointment';
      break;
    case 'schedule':
      labelButton = 'Schedule Apointment';
      break;
  }
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(CreateAppointmentSchema),
    
    defaultValues: {
      ...PatientFormDefaultValues,
      primaryPhysician: appointment ?.primaryPhysician||"",
      schedule: appointment? new Date(appointment.schedule) : new Date(Date.now()) ,
      reason: appointment?.reason|| "",
      note: appointment?.note||"",
      cancellationReason: appointment?.cancellationReason || ""
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log('CLICKING')
    let status;
    switch(type){
      case 'schedule':
        status = 'scheduled';
        break;
      case 'cancel':
        status = 'canceled';
        break;
        default:
          status= 'pending';
    }
    console.log('############# status',status);
    try{
      if(type === 'create' && patientId){
        const newAppointment = {
          userId: userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: values.schedule,
          reason: values.reason,
          note: values.note,
          status: status,
  
        }

        const NewAppointment = await registerNewAppoinetment(newAppointment);
        console.log(NewAppointment);
        if(NewAppointment){
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${NewAppointment.$id}`)
        }

      }
      else{
        const AppointmentToUpdate = {
          
          userId,
          appointmentId:appointment?.$id,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status:status,
            cancellationReason: values?.cancellationReason,
            reason: values?.reason

          },
          type
        }
        console.log(AppointmentToUpdate);
        const updateAppointment = await updateAppointmentDocuments(AppointmentToUpdate);
        console.log(updateAppointment);
        if(updateAppointment){
          setOpen(false)
          form.reset();
        }
      }
    }catch (error)
    {
      console.log(error);
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type !== 'cancel' && <>
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
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="reason"
          label="what is the reason ?"
          placeholder="any thing else"
          iconSrc={i2}
          // iconAlt="email"
        />
        <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="note"
          label="Notes"
          placeholder="bla bla bla bla"
          iconSrc={i2}
          // iconAlt="email"
        />

<CustomField
            fieldType={FormFieldTypes.date_picker}
            control={form}
            name="schedule"
            label="schedule New Appointment"
            // placeholder="abdellah2gmail.com"
            iconSrc={i2}
            // iconAlt="email"
            showTimeSelect
            dateFormat="MM/dd/yyyy - h:mm aa"
          />
        </>}

        {type === 'cancel' && <>
          <CustomField
          fieldType={FormFieldTypes.Textarea}
          control={form}
          name="cancellationReason"
          label="Cancellation Reason"
          placeholder="bla bla bla bla bla bla"
          iconSrc={i2}
          // iconAlt="email"
        />


        </>}
   



      

        <SubmitButton isLoading={isLoading}>{labelButton}</SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
