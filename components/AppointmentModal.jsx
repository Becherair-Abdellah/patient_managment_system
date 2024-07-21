'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AppointmentForm from "./forms/AppointmentForm"
import { useState } from "react"
import { Button } from "./ui/button"
const AppointmentModal = ({type,userId,patientId,appointment}) => {
  const [open,setOpen] = useState(false);
  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTitle></DialogTitle>
  <DialogTrigger>
   <Button>{type}</Button>
  </DialogTrigger>
  <DialogContent>
    <AppointmentForm type={type} userId={userId} patientId={patientId} appointment={appointment}
    setOpen={setOpen}/>
  </DialogContent>
</Dialog>

  )
}

export default AppointmentModal
