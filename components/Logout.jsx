'use client'
import Link from 'next/link';
import React from 'react'
import { IoLogOut } from 'react-icons/io5'
import { basic_action,success_action,schedule_action } from '@/redux/features/progess-status';
import { useDispatch, useSelector } from 'react-redux';

const Logout = () => { 
    const dispatch = useDispatch();
    const basic = useSelector((state) => state.progessStatus.basic);
    const schedule = useSelector((state) => state.progessStatus.schedule);
    const success = useSelector((state) => state.progessStatus.success);
    const logout = async ()=>{
        try {
            const response = await fetch("/api/logout",{
                method: 'POST',            
            });
            const data = await response.json();
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="m-4 w-fit h-fit cursor-pointer">
            <Link href={`/login`}  onClick={()=>{
                {basic?dispatch(basic_action()):''}
                {schedule?dispatch(schedule_action()):''}
                {success?dispatch(success_action()):''}
        logout();
    }}> <IoLogOut alt="success" size={33} color="red" /></Link>
    </div>
  )
}

export default Logout
