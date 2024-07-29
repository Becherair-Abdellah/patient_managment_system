'use client'
import React, { useState } from 'react'
import BasicInformationForm from './BasicInformationForm';
import ScheduleAppointmentForm from './ScheduleAppointmentForm';


const NewAppointmentForm = () => {
    const [info,setInfo] = useState(false);
    const [appointment,setappointment] = useState(true);
    const [successAppointemnt,setsuccessAppointemnt] = useState(false);
  return (
    <div className=' p-3 rounded-md'>
    {info && <>
    <div className='mb-7'>
        <h1 className='text-xl text-primaryColor  font-bold' >Basic Information</h1>
        <span className='text-md text-gray-500 italic '>setp 1</span>
    </div>
    <BasicInformationForm/>
    </>}
    {appointment && <>
    <div className='mb-7'>
        <h1 className='text-xl text-primaryColor  font-bold' >Schedule Appointment</h1>
        <span className='text-md text-gray-500 italic '>setp 2</span>
    </div>
    <ScheduleAppointmentForm/>
    </>}
    {successAppointemnt && <></>}
    
    </div>
  )
}

export default NewAppointmentForm
