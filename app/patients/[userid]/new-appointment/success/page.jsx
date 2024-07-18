
import { Doctors } from "@/app/constants/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link"
import { formatDateTime } from "@/lib/utils";
async function SuccessPage({params:{userid}, searchParams}) {
    const appointmentId = searchParams?.appointmentId || '';
    const appointment = await getAppointment(appointmentId);
    console.log(appointment);
    const doctor = Doctors.find((doctor)=>doctor.name === appointment.primaryPhysician )
    console.log(doctor)
  return (
    <div>
        <h1> Hello Now Is Successs</h1>
        <div>
            <h1>{doctor.name}</h1>
            <Image
            src={doctor.image.src}
            width={30}
            height={30}
            />
            </div>
        <div>{formatDateTime(appointment.schedule).dateTime}</div>
       <button>
       <Link href={`/patients/${userid}/new-appointment`}>
       New Appointment
       </Link>
       </button>
    </div>
  )
}

export default SuccessPage
