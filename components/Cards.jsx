"use client";
import CustomCard from "@/app/admin/dashboard/CustomCard";
import React, { useEffect, useState } from "react";
import { CgSandClock } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { MdCancel, MdOutlineSick } from "react-icons/md";
import {  getAppointmnets, getPatients } from "@/lib/actions/dashboard-actions";

const Cards = () => {

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        
      <CustomCard
        nbr={all_patients.total}
        title="Patients"
        discr="all patients in your database"
        className="text-white font-bold bg-gradient-to-r from-indigo-500 to-gray-500"
        icon={<MdOutlineSick size={20} />}
      />
      <CustomCard
        nbr={435}
        title="Scheduled"
        discr="patients scheduled appointments"
        className="text-white font-bold bg-gradient-to-r from-indigo-500 to-green-500"
        icon={<IoCalendarOutline size={20} />}
      />
      <CustomCard
        nbr={435}
        title="Pending"
        discr="patients pending appointments"
        className="text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500"
        icon={<CgSandClock size={20} />}
      />
      <CustomCard
        nbr={435}
        title="Canceled"
        discr="patients canceled appointments"
        className="text-white font-bold bg-gradient-to-r from-indigo-500 to-red-500"
        icon={<MdCancel size={20} />}
      />
    </div>
  );
};

export default Cards;
